import { prisma } from '../../config/prisma.js';
import { NotificationChannel, NotificationStatus } from '@prisma/client';
import { emailService } from '../../services/email.service.js';
import { whatsappService } from '../../services/whatsapp.service.js';
import { NotFoundError } from '../../utils/errors.js';

export class NotificationsService {
  async getNotifications(page = 1, limit = 20, channel?: NotificationChannel, status?: NotificationStatus) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (channel) where.channel = channel;
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.notification.count({ where }),
    ]);

    return {
      notifications: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async testSend(channel: 'EMAIL' | 'WHATSAPP', recipient: string, message: string) {
    if (channel === 'EMAIL') {
      const sent = await emailService.sendMail({
        to: recipient,
        subject: 'Ruthved Organic — Test Notification',
        text: message,
        html: `<p>${message}</p>`,
      });
      return { success: sent, channel, recipient };
    } else {
      const sent = await whatsappService.sendTextMessage(recipient, message);
      return { success: sent, channel, recipient };
    }
  }

  async retryNotification(id: string) {
    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundError('Notification not found');

    let success = false;
    let error: string | null = null;

    try {
      if (notification.channel === NotificationChannel.EMAIL && notification.recipientEmail) {
        success = await emailService.sendMail({
          to: notification.recipientEmail,
          subject: 'Ruthved Organic Notification',
          html: `<pre>${JSON.stringify(notification.payload, null, 2)}</pre>`,
        });
      } else if (notification.channel === NotificationChannel.WHATSAPP && notification.recipientPhone) {
        success = await whatsappService.sendTextMessage(
          notification.recipientPhone,
          `Notification retry for payload: ${JSON.stringify(notification.payload)}`
        );
      }
    } catch (err: any) {
      error = err.message;
    }

    return prisma.notification.update({
      where: { id },
      data: {
        status: success ? NotificationStatus.SENT : NotificationStatus.FAILED,
        error: error || (success ? null : 'Failed to deliver on retry'),
      },
    });
  }
}

export const notificationsService = new NotificationsService();
