import { z } from 'zod';

export const createReviewSchema = z.object({
  body: z.object({
    productId: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    title: z.string().optional(),
    comment: z.string().min(5, 'Review comment must have at least 5 characters'),
    images: z.array(z.string().url()).optional(),
  }),
});

export const moderateReviewSchema = z.object({
  body: z.object({
    isApproved: z.boolean(),
  }),
});
