import { Request, Response, NextFunction } from 'express';
import { paymentService } from './payment.service.js';
import { sendSuccess } from '../../utils/response.js';

export class PaymentController {
  async verifyPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentService.verifyPayment(req.body);
      return sendSuccess(res, result, 'Payment verified successfully');
    } catch (error) {
      next(error);
    }
  }

  async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const signature = req.headers['x-razorpay-signature'] as string;
      const rawBody = (req as any).rawBody || JSON.stringify(req.body);

      const result = await paymentService.handleWebhook(rawBody, signature);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async processRefund(req: Request, res: Response, next: NextFunction) {
    try {
      const refund = await paymentService.processRefund(req.body, req.user?.userId);
      return sendSuccess(res, refund, 'Refund processed successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const paymentController = new PaymentController();
