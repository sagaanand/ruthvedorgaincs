import { z } from 'zod';

export const notificationListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  channel: z.enum(['EMAIL', 'WHATSAPP', 'SMS']).optional(),
  status: z.enum(['PENDING', 'SENT', 'FAILED']).optional(),
});

export const testNotificationSchema = z.object({
  channel: z.enum(['EMAIL', 'WHATSAPP']),
  recipient: z.string().min(3),
  message: z.string().min(1),
});
