import { prisma } from '../../config/prisma.js';
import { BadRequestError, ConflictError, NotFoundError } from '../../utils/errors.js';

export class CouponService {
  async getCoupons() {
    return prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { redemptions: true } },
      },
    });
  }

  async validateCoupon(code: string, cartTotal: number, userId?: string) {
    const formattedCode = code.trim().toUpperCase();
    const now = new Date();

    const coupon = await prisma.coupon.findUnique({
      where: { code: formattedCode },
    });

    if (!coupon) {
      throw new NotFoundError(`Coupon code '${formattedCode}' is invalid.`);
    }

    if (!coupon.isActive) {
      throw new BadRequestError('This coupon is currently inactive.');
    }

    if (coupon.startsAt > now) {
      throw new BadRequestError('This coupon promotion has not started yet.');
    }

    if (coupon.expiresAt < now) {
      throw new BadRequestError('This coupon promotion has expired.');
    }

    if (coupon.usageLimitTotal && coupon.timesUsed >= coupon.usageLimitTotal) {
      throw new BadRequestError('This coupon has reached its maximum usage limit.');
    }

    if (coupon.minOrderAmount && cartTotal < Number(coupon.minOrderAmount)) {
      throw new BadRequestError(
        `Minimum cart total of ₹${coupon.minOrderAmount} is required for this coupon.`
      );
    }

    if (userId) {
      const userRedemptions = await prisma.couponRedemption.count({
        where: { couponId: coupon.id, userId },
      });
      if (userRedemptions >= coupon.usageLimitPerUser) {
        throw new BadRequestError('You have already used this coupon code.');
      }
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = (cartTotal * Number(coupon.discountValue)) / 100;
      if (coupon.maxDiscountAmount && discountAmount > Number(coupon.maxDiscountAmount)) {
        discountAmount = Number(coupon.maxDiscountAmount);
      }
    } else {
      discountAmount = Math.min(Number(coupon.discountValue), cartTotal);
    }

    discountAmount = Number(discountAmount.toFixed(2));

    return {
      isValid: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: Number(coupon.discountValue),
        discountAmount,
        description: coupon.description,
      },
    };
  }

  async createCoupon(data: any) {
    const existing = await prisma.coupon.findUnique({ where: { code: data.code } });
    if (existing) {
      throw new ConflictError(`Coupon with code '${data.code}' already exists.`);
    }

    return prisma.coupon.create({
      data,
    });
  }

  async updateCoupon(id: string, data: any) {
    const coupon = await prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new NotFoundError('Coupon not found');

    if (data.code && data.code !== coupon.code) {
      const existing = await prisma.coupon.findUnique({ where: { code: data.code } });
      if (existing) {
        throw new ConflictError(`Coupon with code '${data.code}' already exists.`);
      }
    }

    return prisma.coupon.update({
      where: { id },
      data,
    });
  }

  async deleteCoupon(id: string) {
    return prisma.coupon.delete({ where: { id } });
  }
}

export const couponService = new CouponService();
