import { Router } from 'express';
import { paymentController } from './payment.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { verifyPaymentSchema, refundSchema } from './payment.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// Client verification endpoint (after Razorpay modal closes)
router.post('/verify', optionalAuth, validate(verifyPaymentSchema), paymentController.verifyPayment);

// Server-side Razorpay Webhook
router.post('/webhook', paymentController.handleWebhook);

// Admin refunds
router.post(
  '/refund',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.ORDER_MANAGER),
  validate(refundSchema),
  paymentController.processRefund
);

export default router;
