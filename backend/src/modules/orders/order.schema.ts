import { z } from 'zod';
import { OrderStatus, PaymentMethod } from '@prisma/client';

export const checkoutSchema = z.object({
  body: z.object({
    customerName: z.string().min(2, 'Customer name is required'),
    customerEmail: z.string().email('Valid customer email is required'),
    customerPhone: z.string().min(10, 'Valid customer phone is required'),
    shippingAddress: z.object({
      fullName: z.string().min(2),
      phone: z.string().min(10),
      addressLine1: z.string().min(3),
      addressLine2: z.string().optional(),
      city: z.string().min(2),
      state: z.string().min(2),
      postalCode: z.string().min(6),
      country: z.string().default('India'),
    }),
    billingAddress: z
      .object({
        fullName: z.string(),
        phone: z.string(),
        addressLine1: z.string(),
        addressLine2: z.string().optional(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string().default('India'),
      })
      .optional(),
    items: z
      .array(
        z.object({
          productId: z.string().uuid(),
          variantId: z.string().uuid().optional().nullable(),
          quantity: z.number().int().positive(),
        })
      )
      .min(1, 'Cart cannot be empty'),
    couponCode: z.string().optional(),
    paymentMethod: z.nativeEnum(PaymentMethod).default(PaymentMethod.ONLINE),
    notes: z.string().optional(),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(OrderStatus),
    notes: z.string().optional(),
  }),
});

export const cancelOrderSchema = z.object({
  body: z.object({
    reason: z.string().min(3, 'Cancellation reason is required'),
  }),
});

export const orderQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(15),
    status: z.string().optional(),
    search: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});
