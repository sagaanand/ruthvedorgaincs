import { z } from 'zod';

export const verifyPaymentSchema = z.object({
  body: z.object({
    orderId: z.string().uuid(),
    razorpayOrderId: z.string().min(1),
    razorpayPaymentId: z.string().min(1),
    razorpaySignature: z.string().min(1),
  }),
});

export const refundSchema = z.object({
  body: z.object({
    orderId: z.string().uuid(),
    amount: z.coerce.number().positive(),
    reason: z.string().min(3),
  }),
});
