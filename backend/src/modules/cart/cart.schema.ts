import { z } from 'zod';

export const addToCartSchema = z.object({
  body: z.object({
    productId: z.string().uuid('Valid Product ID is required'),
    variantId: z.string().uuid().optional().nullable(),
    quantity: z.number().int().positive('Quantity must be at least 1').default(1),
    guestToken: z.string().optional(),
  }),
});

export const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z.number().int().nonnegative('Quantity cannot be negative'),
  }),
});

export const mergeCartSchema = z.object({
  body: z.object({
    guestToken: z.string().min(1, 'Guest token is required'),
  }),
});
