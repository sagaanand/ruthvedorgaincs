import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import { verifyRazorpaySignature, verifyRazorpayWebhookSignature } from '../src/integrations/razorpay.integration.js';
import { env } from '../src/config/env.js';

describe('Razorpay Signature & Payment Security', () => {
  it('should successfully verify a valid HMAC SHA256 checkout signature', () => {
    const orderId = 'order_test_987654321';
    const paymentId = 'pay_test_123456789';
    const secret = env.RAZORPAY_KEY_SECRET;

    // Generate expected HMAC
    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
    expect(isValid).toBe(true);
  });

  it('should reject a tampered payment signature', () => {
    const orderId = 'order_test_987654321';
    const paymentId = 'pay_test_123456789';
    const tamperedSignature = 'deadbeef1234567890abcdef0123456789abcdef0123456789abcdef01234567';

    const isValid = verifyRazorpaySignature(orderId, paymentId, tamperedSignature);
    expect(isValid).toBe(false);
  });

  it('should verify valid webhook signature using raw body and reject tampered webhook body', () => {
    const rawBody = JSON.stringify({
      event: 'payment.captured',
      payload: { payment: { entity: { id: 'pay_123', amount: 95000 } } },
    });
    const secret = env.RAZORPAY_WEBHOOK_SECRET;

    const webhookSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    const isValid = verifyRazorpayWebhookSignature(rawBody, webhookSignature);
    expect(isValid).toBe(true);

    const isTamperedValid = verifyRazorpayWebhookSignature(rawBody + 'tampered', webhookSignature);
    expect(isTamperedValid).toBe(false);
  });
});
