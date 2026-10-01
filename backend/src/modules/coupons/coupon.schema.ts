import { z } from 'zod';
import { DiscountType } from '@prisma/client';

export const createCouponSchema = z.object({
  body: z.object({
    code: z.string().min(3).toUpperCase(),
    description: z.string().optional(),
    discountType: z.nativeEnum(DiscountType).default(DiscountType.PERCENTAGE),
    discountValue: z.coerce.number().positive(),
    minOrderAmount: z.coerce.number().positive().optional().nullable(),
    maxDiscountAmount: z.coerce.number().positive().optional().nullable(),
    usageLimitTotal: z.coerce.number().int().positive().optional().nullable(),
    usageLimitPerUser: z.coerce.number().int().positive().default(1),
    startsAt: z.coerce.date(),
    expiresAt: z.coerce.date(),
    isActive: z.boolean().default(true),
    applicableCategoryIds: z.array(z.string()).optional().nullable(),
  }),
});

export const updateCouponSchema = z.object({
  body: createCouponSchema.shape.body.partial(),
});

export const validateCouponSchema = z.object({
  body: z.object({
    code: z.string().min(1, 'Coupon code is required'),
    cartTotal: z.coerce.number().nonnegative(),
  }),
});
