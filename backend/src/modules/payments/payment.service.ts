import { prisma } from '../../config/prisma.js';
import { BadRequestError, NotFoundError } from '../../utils/errors.js';
import {
  verifyRazorpaySignature,
  verifyRazorpayWebhookSignature,
  processRazorpayRefund,
} from '../../integrations/razorpay.integration.js';
import { inventoryService } from '../inventory/inventory.service.js';
import { dispatchNotificationJob } from '../../jobs/queue.js';
import { generateRefundNumber } from '../../utils/orderNumber.js';
import { OrderStatus, PaymentStatus, RefundStatus } from '@prisma/client';
import { logger } from '../../config/logger.js';

export class PaymentService {
  async verifyPayment(data: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) {
    const isValid = verifyRazorpaySignature(
      data.razorpayOrderId,
      data.razorpayPaymentId,
      data.razorpaySignature
    );

    if (!isValid) {
      throw new BadRequestError('Invalid Razorpay payment signature.');
    }

    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
      include: { items: true },
    });

    if (!order) throw new NotFoundError('Order not found');

    // Idempotency: If already paid, return early
    if (order.paymentStatus === PaymentStatus.CAPTURED) {
      return { success: true, orderNumber: order.orderNumber, alreadyProcessed: true };
    }

    const updated = await prisma.$transaction(async tx => {
      // 1. Update Payment record
      await tx.payment.upsert({
        where: { gatewayOrderId: data.razorpayOrderId },
        create: {
          orderId: order.id,
          gateway: 'RAZORPAY',
          gatewayOrderId: data.razorpayOrderId,
          gatewayPaymentId: data.razorpayPaymentId,
          gatewaySignature: data.razorpaySignature,
          amount: order.totalAmount,
          status: PaymentStatus.CAPTURED,
        },
        update: {
          gatewayPaymentId: data.razorpayPaymentId,
          gatewaySignature: data.razorpaySignature,
          status: PaymentStatus.CAPTURED,
        },
      });

      // 2. Update Order status
      const updatedOrder = await tx.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.CONFIRMED,
          paymentStatus: PaymentStatus.CAPTURED,
        },
        include: { items: true },
      });

      // 3. Log event
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
          fromStatus: order.status,
          toStatus: OrderStatus.CONFIRMED,
          actorType: 'SYSTEM',
          notes: `Payment verified successfully (ID: ${data.razorpayPaymentId})`,
        },
      });

      return updatedOrder;
    });

    // 4. Deduct inventory & dispatch notifications
    await inventoryService.deductStock(order.id);
    await dispatchNotificationJob('ORDER_CONFIRMATION', { order: updated });

    return {
      success: true,
      orderNumber: updated.orderNumber,
      orderId: updated.id,
    };
  }

  async handleWebhook(rawBody: string | Buffer, signature: string) {
    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      logger.warn('Razorpay webhook signature verification failed');
      throw new BadRequestError('Invalid webhook signature');
    }

    const event = typeof rawBody === 'string' ? JSON.parse(rawBody) : JSON.parse(rawBody.toString('utf-8'));
    logger.info({ eventType: event.event }, 'Received Razorpay webhook');

    if (event.event === 'payment.captured') {
      const paymentEntity = event.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      const payment = await prisma.payment.findUnique({
        where: { gatewayOrderId: razorpayOrderId },
      });

      if (payment && payment.status !== PaymentStatus.CAPTURED) {
        await this.verifyPayment({
          orderId: payment.orderId,
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature: 'webhook_verified',
        });
      }
    } else if (event.event === 'payment.failed') {
      const paymentEntity = event.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;

      const payment = await prisma.payment.findUnique({
        where: { gatewayOrderId: razorpayOrderId },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.FAILED,
            failureReason: paymentEntity.error_description || 'Payment failed',
          },
        });

        await prisma.order.update({
          where: { id: payment.orderId },
          data: {
            status: OrderStatus.PAYMENT_FAILED,
            paymentStatus: PaymentStatus.FAILED,
          },
        });

        await inventoryService.releaseReservation(payment.orderId);
      }
    }

    return { received: true };
  }

  async processRefund(data: { orderId: string; amount: number; reason: string }, actorId?: string) {
    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
      include: { payments: { where: { status: PaymentStatus.CAPTURED }, take: 1 } },
    });

    if (!order) throw new NotFoundError('Order not found');

    const payment = order.payments[0];
    const refundNumber = generateRefundNumber();

    let gatewayRefundId: string | undefined;

    if (order.paymentMethod === 'ONLINE' && payment?.gatewayPaymentId) {
      const rzpRefund = await processRazorpayRefund(payment.gatewayPaymentId, data.amount, {
        reason: data.reason,
      });
      gatewayRefundId = rzpRefund.id;
    }

    const refund = await prisma.refund.create({
      data: {
        orderId: order.id,
        paymentId: payment?.id,
        refundNumber,
        gatewayRefundId,
        amount: data.amount,
        reason: data.reason,
        status: RefundStatus.PROCESSED,
        processedAt: new Date(),
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.REFUNDED,
        paymentStatus: PaymentStatus.REFUNDED,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: actorId,
        action: 'PROCESS_REFUND',
        entityType: 'Refund',
        entityId: refund.id,
        details: { amount: data.amount, reason: data.reason },
      },
    });

    return refund;
  }
}

export const paymentService = new PaymentService();
