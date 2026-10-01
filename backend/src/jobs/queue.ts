import { Queue, Worker } from 'bullmq';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { emailService } from '../services/email.service.js';
import { whatsAppService } from '../services/whatsapp.service.js';

let notificationQueue: Queue | null = null;

if (env.ENABLE_REDIS_JOBS) {
  try {
    notificationQueue = new Queue('notifications', {
      connection: { url: env.REDIS_URL },
    });

    new Worker(
      'notifications',
      async job => {
        logger.info({ jobName: job.name, jobId: job.id }, 'Processing notification job');
        const { type, payload } = job.data;

        if (type === 'ORDER_CONFIRMATION') {
          await emailService.sendOrderConfirmationEmail(payload.order);
          await whatsAppService.sendOrderConfirmation(payload.order);
        } else if (type === 'SHIPMENT_UPDATE') {
          await emailService.sendShipmentEmail(payload.order, payload.shipment);
          await whatsAppService.sendShipmentTracking(payload.order, payload.shipment);
        } else if (type === 'WELCOME') {
          await emailService.sendWelcomeEmail(payload.name, payload.email);
        }
      },
      { connection: { url: env.REDIS_URL } }
    );

    logger.info('BullMQ notification worker initialized with Redis');
  } catch (error: any) {
    logger.warn({ error: error.message }, 'Failed to initialize BullMQ with Redis; fallback to direct dispatch');
    notificationQueue = null;
  }
}

export async function dispatchNotificationJob(type: string, payload: any): Promise<void> {
  if (notificationQueue) {
    await notificationQueue.add(type, { type, payload });
  } else {
    // Immediate resilient async execution
    setImmediate(async () => {
      try {
        if (type === 'ORDER_CONFIRMATION') {
          await emailService.sendOrderConfirmationEmail(payload.order);
          await whatsAppService.sendOrderConfirmation(payload.order);
        } else if (type === 'SHIPMENT_UPDATE') {
          await emailService.sendShipmentEmail(payload.order, payload.shipment);
          await whatsAppService.sendShipmentTracking(payload.order, payload.shipment);
        } else if (type === 'WELCOME') {
          await emailService.sendWelcomeEmail(payload.name, payload.email);
        }
      } catch (err: any) {
        logger.error({ error: err.message, type }, 'Background notification dispatch failed');
      }
    });
  }
}
