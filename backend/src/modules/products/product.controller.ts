import { Request, Response, NextFunction } from 'express';
import { productService } from './product.service.js';
import { sendCreated, sendPaginated, sendSuccess } from '../../utils/response.js';
import { processAndSaveImage } from '../../middleware/upload.middleware.js';
import { BadRequestError } from '../../utils/errors.js';

export class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getProducts({
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 12,
        category: req.query.category as string,
        search: req.query.search as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        sortBy: req.query.sortBy as any,
        tag: req.query.tag as any,
        includeInactive: req.query.includeInactive === 'true',
      });

      return sendPaginated(res, result.products, result.page, result.limit, result.total);
    } catch (error) {
      next(error);
    }
  }

  async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProductBySlug(req.params.slug);
      return sendSuccess(res, product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.createProduct(req.body, req.user?.userId);
      return sendCreated(res, product, 'Product created successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body, req.user?.userId);
      return sendSuccess(res, product, 'Product updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.softDeleteProduct(req.params.id, req.user?.userId);
      return sendSuccess(res, null, 'Product deleted successfully (soft delete)');
    } catch (error) {
      next(error);
    }
  }

  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestError('No image file provided');
      }

      const saved = await processAndSaveImage(req.file.buffer, 'product');
      return sendSuccess(res, saved, 'Image uploaded and optimized to WebP successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
