import { prisma } from '../../config/prisma.js';
import { BadRequestError, NotFoundError } from '../../utils/errors.js';
import { OrderStatus } from '@prisma/client';

export class ReviewService {
  async getProductReviews(productId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId, isApproved: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true } },
        },
      }),
      prisma.review.count({ where: { productId, isApproved: true } }),
    ]);

    return { reviews, total, page, limit };
  }

  async createReview(userId: string, data: any) {
    // Check if user has purchased this product
    const deliveredOrder = await prisma.order.findFirst({
      where: {
        userId,
        status: OrderStatus.DELIVERED,
        items: { some: { productId: data.productId } },
      },
    });

    const isVerifiedPurchase = Boolean(deliveredOrder);

    // Prevent duplicate review per user per product
    const existing = await prisma.review.findFirst({
      where: { userId, productId: data.productId },
    });

    if (existing) {
      throw new BadRequestError('You have already submitted a review for this product.');
    }

    return prisma.review.create({
      data: {
        ...data,
        userId,
        isVerifiedPurchase,
        isApproved: false, // Default pending admin moderation
      },
    });
  }

  async reportReview(reviewId: string) {
    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundError('Review not found');

    return prisma.review.update({
      where: { id: reviewId },
      data: { reportCount: { increment: 1 } },
    });
  }

  async getAdminReviews(params: { status?: 'all' | 'pending' | 'approved'; page?: number; limit?: number }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (params.status === 'pending') where.isApproved = false;
    if (params.status === 'approved') where.isApproved = true;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          product: { select: { id: true, name: true } },
          user: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.review.count({ where }),
    ]);

    return { reviews, total, page, limit };
  }

  async moderateReview(id: string, isApproved: boolean) {
    return prisma.review.update({
      where: { id },
      data: { isApproved },
    });
  }

  async deleteReview(id: string) {
    return prisma.review.delete({ where: { id } });
  }
}

export const reviewService = new ReviewService();
