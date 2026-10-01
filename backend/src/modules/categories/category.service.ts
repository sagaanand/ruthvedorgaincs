import { prisma } from '../../config/prisma.js';
import { NotFoundError, ConflictError, BadRequestError } from '../../utils/errors.js';

export class CategoryService {
  async getCategories(includeInactive = false) {
    return prisma.category.findMany({
      where: includeInactive ? undefined : { isActive: true },
      include: {
        children: {
          where: includeInactive ? undefined : { isActive: true },
          orderBy: { displayOrder: 'asc' },
        },
        _count: {
          select: { products: { where: { deletedAt: null, isActive: true } } },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async getCategoryBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' },
        },
        products: {
          where: { deletedAt: null, isActive: true },
          include: {
            images: { orderBy: { displayOrder: 'asc' } },
            variants: { where: { isActive: true }, orderBy: { price: 'asc' } },
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundError(`Category with slug '${slug}' not found`);
    }

    return category;
  }

  async createCategory(data: any) {
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new ConflictError(`Category with slug '${data.slug}' already exists.`);
    }

    return prisma.category.create({
      data,
    });
  }

  async updateCategory(id: string, data: any) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundError('Category not found');
    }

    if (data.slug && data.slug !== category.slug) {
      const existing = await prisma.category.findUnique({ where: { slug: data.slug } });
      if (existing) {
        throw new ConflictError(`Category with slug '${data.slug}' already exists.`);
      }
    }

    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string) {
    const productCount = await prisma.product.count({
      where: { categoryId: id, deletedAt: null },
    });
    if (productCount > 0) {
      throw new BadRequestError(
        `Cannot delete category with ${productCount} active products. Reassign or delete products first.`
      );
    }

    return prisma.category.delete({
      where: { id },
    });
  }

  async toggleStatus(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundError('Category not found');

    return prisma.category.update({
      where: { id },
      data: { isActive: !category.isActive },
    });
  }
}

export const categoryService = new CategoryService();
