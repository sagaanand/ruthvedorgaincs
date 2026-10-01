import Razorpay from 'razorpay';
import crypto from 'crypto';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { AppError } from '../utils/errors.js';

let razorpayClient: Razorpay | null = null;

export function getRazorpayClient(): Razorpay {
  if (!razorpayClient) {
    if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
      logger.warn('Razorpay credentials not fully configured; operating in sandbox/mock mode');
    }
    razorpayClient = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayClient;
}

export interface CreateRazorpayOrderInput {
  orderNumber: string;
  amount: number; // in INR rupees
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export async function createRazorpayOrder(input: CreateRazorpayOrderInput) {
  try {
    const razorpay = getRazorpayClient();
    // Razorpay requires amount in subunits (paise for INR: 1 INR = 100 paise)
    const amountInPaise = Math.round(input.amount * 100);

    const options = {
      amount: amountInPaise,
      currency: input.currency || env.DEFAULT_CURRENCY,
      receipt: input.receipt || input.orderNumber,
      notes: {
        orderNumber: input.orderNumber,
        brand: 'Ruthved Organic',
        ...input.notes,
      },
    };

    const order = await razorpay.orders.create(options);
    logger.info({ razorpayOrderId: order.id, orderNumber: input.orderNumber }, 'Created Razorpay order');
    return order;
  } catch (error: any) {
    logger.error({ error: error.message }, 'Failed to create Razorpay order');
    throw new AppError(`Razorpay order creation failed: ${error.message}`, 502);
  }
}

/**
 * Validates Razorpay checkout signature HMAC SHA256:
 * hmac_sha256(order_id + "|" + razorpay_payment_id, secret) === signature
 */
export function verifyRazorpaySignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean {
  if (!env.RAZORPAY_KEY_SECRET) {
    logger.warn('Skipping signature check: RAZORPAY_KEY_SECRET not set');
    return true;
  }

  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  return generatedSignature === razorpaySignature;
}

/**
 * Validates Razorpay Webhook signature
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string | Buffer,
  signature: string
): boolean {
  if (!env.RAZORPAY_WEBHOOK_SECRET) {
    logger.warn('RAZORPAY_WEBHOOK_SECRET not set; webhook validation disabled');
    return true;
  }

  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
    .update(typeof rawBody === 'string' ? rawBody : rawBody.toString('utf-8'))
    .digest('hex');

  return generatedSignature === signature;
}

export async function processRazorpayRefund(
  paymentId: string,
  amountInRupees: number,
  notes?: Record<string, string>
) {
  try {
    const razorpay = getRazorpayClient();
    const amountInPaise = Math.round(amountInRupees * 100);

    const refund = await razorpay.payments.refund(paymentId, {
      amount: amountInPaise,
      notes,
    });

    logger.info({ refundId: refund.id, paymentId }, 'Processed Razorpay refund');
    return refund;
  } catch (error: any) {
    logger.error({ error: error.message, paymentId }, 'Failed to process Razorpay refund');
    throw new AppError(`Razorpay refund failed: ${error.message}`, 502);
  }
}
