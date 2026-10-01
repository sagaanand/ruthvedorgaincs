import { Request, Response, NextFunction } from 'express';
import { adminService } from './admin.service.js';
import { sendPaginated, sendSuccess } from '../../utils/response.js';

export class AdminController {
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
      const metrics = await adminService.getDashboardMetrics(startDate, endDate);
      return sendSuccess(res, metrics);
    } catch (error) {
      next(error);
    }
  }

  async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 15;
      const search = req.query.search as string;
      const result = await adminService.getCustomers(page, limit, search);
      return sendPaginated(res, result.customers, result.page, result.limit, result.total);
    } catch (error) {
      next(error);
    }
  }

  async toggleCustomerStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await adminService.toggleCustomerStatus(req.params.id);
      return sendSuccess(res, updated, 'Customer account status toggled');
    } catch (error) {
      next(error);
    }
  }

  async getAuditLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 25;
      const result = await adminService.getAuditLogs(page, limit);
      return sendPaginated(res, result.logs, result.page, result.limit, result.total);
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
