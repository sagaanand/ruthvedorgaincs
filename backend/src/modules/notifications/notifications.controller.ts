import { Request, Response } from 'express';
import { notificationsService } from './notifications.service.js';
import { sendSuccess } from '../../utils/response.js';
import { asyncHandler } from '../../middleware/error.middleware.js';
import { NotificationChannel, NotificationStatus } from '@prisma/client';

export class NotificationsController {
  getNotifications = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const channel = req.query.channel as NotificationChannel | undefined;
    const status = req.query.status as NotificationStatus | undefined;

    const result = await notificationsService.getNotifications(page, limit, channel, status);
    sendSuccess(res, result);
  });

  testSend = asyncHandler(async (req: Request, res: Response) => {
    const { channel, recipient, message } = req.body;
    const result = await notificationsService.testSend(channel, recipient, message);
    sendSuccess(res, result, 'Test notification triggered');
  });

  retryNotification = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await notificationsService.retryNotification(id);
    sendSuccess(res, result, 'Notification retried');
  });
}

export const notificationsController = new NotificationsController();
