import { prisma } from '../../config/prisma.js';
import { NotFoundError, BadRequestError } from '../../utils/errors.js';
import { calculateOrderTotals } from '../../utils/calculation.js';

export class CartService {
  async getOrCreateCart(userId?: string, guestToken?: string) {
    if (userId) {
      let cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                include: { images: { where: { isPrimary: true }, take: 1 } },
              },
              variant: true,
            },
          },
        },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId },
          include: {
            items: {
              include: {
                product: {
                  include: { images: { where: { isPrimary: true }, take: 1 } },
                },
                variant: true,
              },
            },
          },
        });
      }
      return cart;
    }

    if (guestToken) {
      let cart = await prisma.cart.findUnique({
        where: { guestToken },
        include: {
          items: {
            include: {
              product: {
                include: { images: { where: { isPrimary: true }, take: 1 } },
              },
              variant: true,
            },
          },
        },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { guestToken },
          include: {
            items: {
              include: {
                product: {
                  include: { images: { where: { isPrimary: true }, take: 1 } },
                },
                variant: true,
              },
            },
          },
        });
      }
      return cart;
    }

    throw new BadRequestError('Either userId or guestToken must be provided to access cart');
  }

  async getCartSummary(userId?: string, guestToken?: string, couponCode?: string) {
    const cart = await this.getOrCreateCart(userId, guestToken);

    // Validate coupon if provided
    let coupon: any = null;
    if (couponCode) {
      const now = new Date();
      coupon = await prisma.coupon.findFirst({
        where: {
          code: couponCode.toUpperCase().trim(),
          isActive: true,
          startsAt: { lte: now },
          expiresAt: { gte: now },
        },
      });
    }

    // Format items with fresh server pricing
    const formattedItems = cart.items.map(item => {
      const price = item.variant
        ? Number(item.variant.price)
        : Number(item.product.discountedPrice || item.product.price);

      return {
        id: item.id,
        productId: item.productId,
        productName: item.product.name,
        variantId: item.variantId,
        variantName: item.variant?.name || null,
        sku: item.variant?.sku || item.product.sku,
        image: item.product.images[0]?.url || '/images/image.png',
        price,
        quantity: item.quantity,
        total: price * item.quantity,
        taxRate: Number(item.product.taxRate),
      };
    });

    const calculation = calculateOrderTotals({
      items: formattedItems.map(i => ({
        price: i.price,
        quantity: i.quantity,
        taxRate: i.taxRate,
      })),
      coupon: coupon
        ? {
            discountType: coupon.discountType,
            discountValue: Number(coupon.discountValue),
            maxDiscountAmount: coupon.maxDiscountAmount ? Number(coupon.maxDiscountAmount) : null,
            minOrderAmount: coupon.minOrderAmount ? Number(coupon.minOrderAmount) : null,
          }
        : null,
    });

    return {
      cartId: cart.id,
      items: formattedItems,
      totalItems: formattedItems.reduce((acc, i) => acc + i.quantity, 0),
      appliedCoupon: coupon ? coupon.code : null,
      ...calculation,
    };
  }

  async addItem(data: {
    productId: string;
    variantId?: string | null;
    quantity: number;
    userId?: string;
    guestToken?: string;
  }) {
    const cart = await this.getOrCreateCart(data.userId, data.guestToken);

    const product = await prisma.product.findUnique({
      where: { id: data.productId, deletedAt: null, isActive: true },
    });
    if (!product) throw new NotFoundError('Product not found or unavailable');

    // Check inventory availability
    const inventory = await prisma.inventory.findFirst({
      where: {
        productId: data.productId,
        variantId: data.variantId || null,
      },
    });

    const available = inventory ? inventory.availableStock : 100;
    if (available < data.quantity) {
      throw new BadRequestError(`Only ${available} units available in stock.`);
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: data.productId,
        variantId: data.variantId || null,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + data.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: data.productId,
          variantId: data.variantId,
          quantity: data.quantity,
        },
      });
    }

    return this.getCartSummary(data.userId, data.guestToken);
  }

  async updateItemQuantity(itemId: string, quantity: number, userId?: string, guestToken?: string) {
    if (quantity <= 0) {
      return this.removeItem(itemId, userId, guestToken);
    }

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });
    if (!item) throw new NotFoundError('Cart item not found');

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return this.getCartSummary(userId, guestToken);
  }

  async removeItem(itemId: string, userId?: string, guestToken?: string) {
    await prisma.cartItem.deleteMany({
      where: { id: itemId },
    });

    return this.getCartSummary(userId, guestToken);
  }

  async clearCart(userId?: string, guestToken?: string) {
    const cart = await this.getOrCreateCart(userId, guestToken);
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
    return this.getCartSummary(userId, guestToken);
  }

  async mergeGuestCart(userId: string, guestToken: string) {
    const guestCart = await prisma.cart.findUnique({
      where: { guestToken },
      include: { items: true },
    });

    if (!guestCart || guestCart.items.length === 0) {
      return this.getCartSummary(userId);
    }

    const userCart = await this.getOrCreateCart(userId);

    for (const item of guestCart.items) {
      const existing = await prisma.cartItem.findFirst({
        where: {
          cartId: userCart.id,
          productId: item.productId,
          variantId: item.variantId,
        },
      });

      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + item.quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          },
        });
      }
    }

    // Delete guest cart items
    await prisma.cartItem.deleteMany({ where: { cartId: guestCart.id } });
    await prisma.cart.delete({ where: { id: guestCart.id } });

    return this.getCartSummary(userId);
  }
}

export const cartService = new CartService();
