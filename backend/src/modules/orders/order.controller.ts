import { Request, Response, NextFunction } from 'express';
import { orderService } from './order.service.js';
import { sendCreated, sendPaginated, sendSuccess } from '../../utils/response.js';
import { invoiceService } from '../../services/invoice.service.js';

export class OrderController {
  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.checkout(req.body, req.user?.userId);
      return sendCreated(res, result, 'Order placed successfully');
    } catch (error) {
      next(error);
    }
  }

  async getMyOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const result = await orderService.getCustomerOrders(req.user!.userId, page, limit);
      return sendPaginated(res, result.orders, result.page, result.limit, result.total);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.getOrderById(req.params.id, req.user?.userId);
      return sendSuccess(res, order);
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const cancelled = await orderService.cancelOrder(
        req.params.id,
        req.body.reason,
        req.user?.userId
      );
      return sendSuccess(res, cancelled, 'Order cancelled successfully');
    } catch (error) {
      next(error);
    }
  }

  async getInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.getOrderById(req.params.id, req.user?.userId);
      const invoiceData = invoiceService.generateInvoiceData(order);
      return sendSuccess(res, invoiceData, 'Invoice data generated');
    } catch (error) {
      next(error);
    }
  }

  async getAdminOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.getAdminOrders({
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 15,
        status: req.query.status as any,
        search: req.query.search as string,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
      });
      return sendPaginated(res, result.orders, result.page, result.limit, result.total);
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await orderService.updateOrderStatus(
        req.params.id,
        req.body.status,
        req.user?.userId,
        req.body.notes
      );
      return sendSuccess(res, updated, 'Order status updated');
    } catch (error) {
      next(error);
    }
  }
}

export const orderController = new OrderController();
