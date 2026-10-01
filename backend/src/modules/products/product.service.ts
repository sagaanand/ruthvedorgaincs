import { prisma } from '../../config/prisma.js';
import { NotFoundError, ConflictError } from '../../utils/errors.js';
import { InventoryReason, Prisma } from '@prisma/client';

export class ProductService {
  async getProducts(params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest' | 'featured';
    tag?: 'all' | 'featured' | 'bestseller';
    includeInactive?: boolean;
  }) {
    const page = params.page || 1;
    const limit = Math.min(params.limit || 12, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      deletedAt: null,
      isActive: params.includeInactive ? undefined : true,
    };

    if (params.category && params.category !== 'all') {
      where.category = { slug: params.category };
    }

    if (params.tag === 'featured') {
      where.isFeatured = true;
    } else if (params.tag === 'bestseller') {
      where.isBestSeller = true;
    }

    if (params.search) {
      const q = params.search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { shortDescription: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (params.minPrice !== undefined || params.maxPrice !== undefined) {
      where.price = {};
      if (params.minPrice !== undefined) where.price.gte = params.minPrice;
      if (params.maxPrice !== undefined) where.price.lte = params.maxPrice;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (params.sortBy === 'price-low') {
      orderBy = { price: 'asc' };
    } else if (params.sortBy === 'price-high') {
      orderBy = { price: 'desc' };
    } else if (params.sortBy === 'featured') {
      orderBy = { isFeatured: 'desc' };
    } else if (params.sortBy === 'newest') {
      orderBy = { createdAt: 'desc' };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: { orderBy: { displayOrder: 'asc' } },
          variants: { where: { isActive: true }, orderBy: { price: 'asc' } },
          _count: { select: { reviews: { where: { isApproved: true } } } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      total,
      page,
      limit,
    };
  }

  async getProductBySlug(slug: string) {
    const product = await prisma.product.findFirst({
      where: { slug, deletedAt: null },
      include: {
        category: true,
        images: { orderBy: { displayOrder: 'asc' } },
        variants: { where: { isActive: true }, orderBy: { price: 'asc' } },
        inventory: true,
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      throw new NotFoundError(`Product '${slug}' not found`);
    }

    // Calculate average rating
    const aggregations = await prisma.review.aggregate({
      where: { productId: product.id, isApproved: true },
      _avg: { rating: true },
      _count: { rating: true },
    });

    return {
      ...product,
      averageRating: aggregations._avg.rating ? Number(aggregations._avg.rating.toFixed(1)) : 5.0,
      reviewsCount: aggregations._count.rating || 0,
    };
  }

  async createProduct(data: any, actorId?: string) {
    const existingSlug = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (existingSlug) throw new ConflictError(`Product with slug '${data.slug}' already exists.`);

    const existingSku = await prisma.product.findUnique({ where: { sku: data.sku } });
    if (existingSku) throw new ConflictError(`Product with SKU '${data.sku}' already exists.`);

    const { variants, images, ...productData } = data;

    // Use transaction for product + variants + inventory + audit log
    return prisma.$transaction(async tx => {
      const product = await tx.product.create({
        data: {
          ...productData,
          images: {
            create: images || [],
          },
        },
      });

      // Create base inventory
      await tx.inventory.create({
        data: {
          productId: product.id,
          currentStock: 100, // Default seed stock or calculate from variants
          availableStock: 100,
          lowStockThreshold: product.lowStockThreshold,
        },
      });

      // Create variants if supplied
      if (variants && variants.length > 0) {
        for (const variant of variants) {
          const createdVariant = await tx.productVariant.create({
            data: {
              ...variant,
              productId: product.id,
            },
          });

          // Create variant inventory
          await tx.inventory.create({
            data: {
              productId: product.id,
              variantId: createdVariant.id,
              currentStock: variant.stock || 0,
              availableStock: variant.stock || 0,
            },
          });

          await tx.inventoryMovement.create({
            data: {
              inventoryId: (await tx.inventory.findUniqueOrThrow({ where: { variantId: createdVariant.id } })).id,
              productId: product.id,
              variantId: createdVariant.id,
              quantityChange: variant.stock || 0,
              previousStock: 0,
              resultingStock: variant.stock || 0,
              reason: InventoryReason.INITIAL_STOCK,
              actorId,
              notes: 'Initial variant creation stock',
            },
          });
        }
      }

      // Record audit log
      await tx.auditLog.create({
        data: {
          userId: actorId,
          action: 'CREATE_PRODUCT',
          entityType: 'Product',
          entityId: product.id,
          details: { name: product.name, sku: product.sku },
        },
      });

      return product;
    });
  }

  async updateProduct(id: string, data: any, actorId?: string) {
    const product = await prisma.product.findUnique({ where: { id, deletedAt: null } });
    if (!product) throw new NotFoundError('Product not found');

    const { variants, images, ...productData } = data;

    return prisma.$transaction(async tx => {
      const updated = await tx.product.update({
        where: { id },
        data: productData,
        include: { variants: true, images: true },
      });

      // If variants provided, update or create them
      if (variants) {
        for (const v of variants) {
          if (v.id) {
            await tx.productVariant.update({
              where: { id: v.id },
              data: {
                name: v.name,
                sku: v.sku,
                price: v.price,
                originalPrice: v.originalPrice,
                stock: v.stock,
                isActive: v.isActive,
              },
            });
          } else {
            await tx.productVariant.create({
              data: {
                ...v,
                productId: id,
              },
            });
          }
        }
      }

      // Record audit
      await tx.auditLog.create({
        data: {
          userId: actorId,
          action: 'UPDATE_PRODUCT',
          entityType: 'Product',
          entityId: id,
          details: productData,
        },
      });

      return updated;
    });
  }

  async softDeleteProduct(id: string, actorId?: string) {
    const product = await prisma.product.findUnique({ where: { id, deletedAt: null } });
    if (!product) throw new NotFoundError('Product not found');

    await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });

    await prisma.auditLog.create({
      data: {
        userId: actorId,
        action: 'SOFT_DELETE_PRODUCT',
        entityType: 'Product',
        entityId: id,
      },
    });

    return true;
  }
}

export const productService = new ProductService();
