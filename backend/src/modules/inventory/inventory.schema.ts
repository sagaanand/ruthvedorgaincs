import { z } from 'zod';
import { InventoryReason } from '@prisma/client';

export const adjustStockSchema = z.object({
  body: z.object({
    productId: z.string().uuid(),
    variantId: z.string().uuid().optional().nullable(),
    quantityChange: z.number().int().refine(val => val !== 0, 'Quantity change cannot be 0'),
    reason: z.nativeEnum(InventoryReason),
    notes: z.string().optional(),
  }),
});
