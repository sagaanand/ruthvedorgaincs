import { z } from 'zod';
import { ShipmentStatus } from '@prisma/client';

export const checkPincodeSchema = z.object({
  query: z.object({
    pincode: z.string().min(6, 'Valid 6-digit Indian PIN code required'),
  }),
});

export const updateShipmentSchema = z.object({
  body: z.object({
    orderId: z.string().uuid(),
    trackingNumber: z.string().min(3),
    courierPartner: z.string().min(2),
    status: z.nativeEnum(ShipmentStatus).default(ShipmentStatus.MANIFESTED),
    estimatedDeliveryDate: z.coerce.date().optional(),
    notes: z.string().optional(),
  }),
});
