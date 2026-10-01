import { Request, Response, NextFunction } from 'express';
import { categoryService } from './category.service.js';
import { sendCreated, sendSuccess } from '../../utils/response.js';

export class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const includeInactive = req.query.includeInactive === 'true';
      const categories = await categoryService.getCategories(includeInactive);
      return sendSuccess(res, categories);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.getCategoryBySlug(req.params.slug);
      return sendSuccess(res, category);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.createCategory(req.body);
      return sendCreated(res, category, 'Category created successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);
      return sendSuccess(res, category, 'Category updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.deleteCategory(req.params.id);
      return sendSuccess(res, null, 'Category deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async toggleStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.toggleStatus(req.params.id);
      return sendSuccess(res, category, 'Category status toggled');
    } catch (error) {
      next(error);
    }
  }
}

export const categoryController = new CategoryController();
