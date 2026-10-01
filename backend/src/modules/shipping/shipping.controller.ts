import { Request, Response, NextFunction } from 'express';
import { shippingService } from './shipping.service.js';
import { sendSuccess } from '../../utils/response.js';

export class ShippingController {
  checkPincode(req: Request, res: Response, next: NextFunction) {
    try {
      const result = shippingService.checkServiceability(req.query.pincode as string);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getTracking(req: Request, res: Response, next: NextFunction) {
    try {
      const shipment = await shippingService.getShipmentByOrder(req.params.orderId);
      return sendSuccess(res, shipment);
    } catch (error) {
      next(error);
    }
  }

  async updateShipment(req: Request, res: Response, next: NextFunction) {
    try {
      const shipment = await shippingService.updateShipment(req.body);
      return sendSuccess(res, shipment, 'Shipment updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const shippingController = new ShippingController();
