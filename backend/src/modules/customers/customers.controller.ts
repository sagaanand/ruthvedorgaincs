import { Request, Response } from 'express';
import { customersService } from './customers.service.js';
import { sendSuccess } from '../../utils/response.js';
import { asyncHandler } from '../../middleware/error.middleware.js';

export class CustomersController {
  getCustomers = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = req.query.search as string | undefined;
    const sortBy = (req.query.sortBy as any) || 'createdAt';
    const sortOrder = (req.query.sortOrder as any) || 'desc';

    const result = await customersService.getCustomers(page, limit, search, sortBy, sortOrder);
    sendSuccess(res, result);
  });

  getCustomerById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await customersService.getCustomerById(id);
    sendSuccess(res, result);
  });

  updateCustomerStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isActive } = req.body;
    const result = await customersService.updateCustomerStatus(id, isActive);
    sendSuccess(res, result, 'Customer status updated successfully');
  });

  exportCustomers = asyncHandler(async (req: Request, res: Response) => {
    const data = await customersService.exportCustomers();
    sendSuccess(res, { data, total: data.length });
  });
}

export const customersController = new CustomersController();
