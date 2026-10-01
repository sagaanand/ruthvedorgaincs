import { Request, Response, NextFunction } from 'express';
import { couponService } from './coupon.service.js';
import { sendCreated, sendSuccess } from '../../utils/response.js';

export class CouponController {
  async getCoupons(_req: Request, res: Response, next: NextFunction) {
    try {
      const coupons = await couponService.getCoupons();
      return sendSuccess(res, coupons);
    } catch (error) {
      next(error);
    }
  }

  async validateCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.validateCoupon(
        req.body.code,
        req.body.cartTotal,
        req.user?.userId
      );
      return sendSuccess(res, result, 'Coupon is valid');
    } catch (error) {
      next(error);
    }
  }

  async createCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const coupon = await couponService.createCoupon(req.body);
      return sendCreated(res, coupon, 'Coupon created successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const coupon = await couponService.updateCoupon(req.params.id, req.body);
      return sendSuccess(res, coupon, 'Coupon updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      await couponService.deleteCoupon(req.params.id);
      return sendSuccess(res, null, 'Coupon deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const couponController = new CouponController();
