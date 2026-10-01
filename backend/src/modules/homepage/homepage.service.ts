import { prisma } from '../../config/prisma.js';

export class HomepageService {
  async getStorefrontContent() {
    const [banners, categories, featuredProducts, bestSellers, testimonials, faqs] = await Promise.all([
      prisma.banner.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
      }),
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
        take: 6,
      }),
      prisma.product.findMany({
        where: { isActive: true, deletedAt: null, isFeatured: true },
        include: {
          images: { orderBy: { displayOrder: 'asc' } },
          variants: { where: { isActive: true }, orderBy: { price: 'asc' } },
        },
        take: 8,
      }),
      prisma.product.findMany({
        where: { isActive: true, deletedAt: null, isBestSeller: true },
        include: {
          images: { orderBy: { displayOrder: 'asc' } },
          variants: { where: { isActive: true }, orderBy: { price: 'asc' } },
        },
        take: 8,
      }),
      prisma.testimonial.findMany({
        where: { isFeatured: true },
        orderBy: { displayOrder: 'asc' },
      }),
      prisma.fAQ.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
        take: 10,
      }),
    ]);

    return {
      banners,
      categories,
      featuredProducts,
      bestSellers,
      testimonials,
      faqs,
    };
  }

  // Admin banner operations
  async getBanners() {
    return prisma.banner.findMany({ orderBy: { displayOrder: 'asc' } });
  }

  async createBanner(data: any) {
    return prisma.banner.create({ data });
  }

  async deleteBanner(id: string) {
    return prisma.banner.delete({ where: { id } });
  }

  // Admin FAQ operations
  async getFaqs() {
    return prisma.fAQ.findMany({ orderBy: { displayOrder: 'asc' } });
  }

  async createFaq(data: any) {
    return prisma.fAQ.create({ data });
  }

  async deleteFaq(id: string) {
    return prisma.fAQ.delete({ where: { id } });
  }

  // Admin Testimonial operations
  async getTestimonials() {
    return prisma.testimonial.findMany({ orderBy: { displayOrder: 'asc' } });
  }

  async createTestimonial(data: any) {
    return prisma.testimonial.create({ data });
  }

  async deleteTestimonial(id: string) {
    return prisma.testimonial.delete({ where: { id } });
  }
}

export const homepageService = new HomepageService();
