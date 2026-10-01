import { Request, Response, NextFunction } from 'express';
import { inventoryService } from './inventory.service.js';
import { sendPaginated, sendSuccess } from '../../utils/response.js';

export class InventoryController {
  async getInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory = await inventoryService.getInventoryList();
      return sendSuccess(res, inventory);
    } catch (error) {
      next(error);
    }
  }

  async getLowStockAlerts(req: Request, res: Response, next: NextFunction) {
    try {
      const alerts = await inventoryService.getLowStockAlerts();
      return sendSuccess(res, alerts);
    } catch (error) {
      next(error);
    }
  }

  async getMovements(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await inventoryService.getMovements({
        productId: req.query.productId as string,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 20,
      });
      return sendPaginated(res, result.movements, result.page, result.limit, result.total);
    } catch (error) {
      next(error);
    }
  }

  async adjustStock(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await inventoryService.adjustStock(req.body, req.user?.userId);
      return sendSuccess(res, updated, 'Stock level adjusted successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const inventoryController = new InventoryController();
