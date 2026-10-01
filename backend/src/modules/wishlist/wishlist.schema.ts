import { z } from 'zod';

export const addToWishlistSchema = z.object({
  body: z.object({
    productId: z.string().uuid('Valid Product ID is required'),
  }),
});
