import { Request, Response, NextFunction } from 'express';
import { addressService } from './address.service.js';
import { sendCreated, sendSuccess } from '../../utils/response.js';

export class AddressController {
  async getAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const addresses = await addressService.getAddresses(req.user!.userId);
      return sendSuccess(res, addresses);
    } catch (error) {
      next(error);
    }
  }

  async createAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const address = await addressService.createAddress(req.user!.userId, req.body);
      return sendCreated(res, address, 'Address added successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const address = await addressService.updateAddress(req.user!.userId, req.params.id, req.body);
      return sendSuccess(res, address, 'Address updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      await addressService.deleteAddress(req.user!.userId, req.params.id);
      return sendSuccess(res, null, 'Address deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async setDefault(req: Request, res: Response, next: NextFunction) {
    try {
      const address = await addressService.setDefault(req.user!.userId, req.params.id);
      return sendSuccess(res, address, 'Default address updated');
    } catch (error) {
      next(error);
    }
  }
}

export const addressController = new AddressController();
