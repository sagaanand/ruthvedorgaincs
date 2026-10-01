import { prisma } from '../../config/prisma.js';
import { NotFoundError } from '../../utils/errors.js';
import { cartService } from '../cart/cart.service.js';

export class WishlistService {
  async getOrCreateWishlist(userId: string) {
    let wishlist = await prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
                variants: { where: { isActive: true }, take: 1 },
              },
            },
          },
        },
      },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: { where: { isPrimary: true }, take: 1 },
                  variants: { where: { isActive: true }, take: 1 },
                },
              },
            },
          },
        },
      });
    }

    return wishlist;
  }

  async getWishlist(userId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);
    return wishlist.items.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      slug: item.product.slug,
      price: Number(item.product.discountedPrice || item.product.price),
      originalPrice: item.product.discountedPrice ? Number(item.product.price) : null,
      image: item.product.images[0]?.url || '/images/image.png',
      isAvailable: item.product.isActive && item.product.deletedAt === null,
      createdAt: item.createdAt,
    }));
  }

  async addProduct(userId: string, productId: string) {
    const product = await prisma.product.findUnique({
      where: { id: productId, deletedAt: null },
    });
    if (!product) throw new NotFoundError('Product not found');

    const wishlist = await this.getOrCreateWishlist(userId);

    const existing = await prisma.wishlistItem.findFirst({
      where: { wishlistId: wishlist.id, productId },
    });

    if (!existing) {
      await prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId,
        },
      });
    }

    return this.getWishlist(userId);
  }

  async removeProduct(userId: string, productId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);
    await prisma.wishlistItem.deleteMany({
      where: { wishlistId: wishlist.id, productId },
    });
    return this.getWishlist(userId);
  }

  async moveToCart(userId: string, productId: string) {
    await cartService.addItem({
      productId,
      quantity: 1,
      userId,
    });
    await this.removeProduct(userId, productId);
    return this.getWishlist(userId);
  }
}

export const wishlistService = new WishlistService();
