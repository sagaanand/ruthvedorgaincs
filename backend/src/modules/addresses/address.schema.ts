import { z } from 'zod';

export const addressSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    phone: z.string().min(10, 'Valid 10-digit phone number is required'),
    addressLine1: z.string().min(3, 'Address line 1 is required'),
    addressLine2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postalCode: z.string().min(6, 'Valid 6-digit PIN code is required'),
    country: z.string().default('India'),
    isDefault: z.boolean().default(false),
    type: z.enum(['SHIPPING', 'BILLING']).default('SHIPPING'),
  }),
});

export const updateAddressSchema = z.object({
  body: addressSchema.shape.body.partial(),
});
