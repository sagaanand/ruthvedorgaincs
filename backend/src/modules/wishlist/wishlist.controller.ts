import { Request, Response, NextFunction } from 'express';
import { wishlistService } from './wishlist.service.js';
import { sendSuccess } from '../../utils/response.js';

export class WishlistController {
  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await wishlistService.getWishlist(req.user!.userId);
      return sendSuccess(res, items);
    } catch (error) {
      next(error);
    }
  }

  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await wishlistService.addProduct(req.user!.userId, req.body.productId);
      return sendSuccess(res, items, 'Product added to wishlist');
    } catch (error) {
      next(error);
    }
  }

  async removeProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await wishlistService.removeProduct(req.user!.userId, req.params.productId);
      return sendSuccess(res, items, 'Product removed from wishlist');
    } catch (error) {
      next(error);
    }
  }

  async moveToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await wishlistService.moveToCart(req.user!.userId, req.params.productId);
      return sendSuccess(res, items, 'Product moved to cart');
    } catch (error) {
      next(error);
    }
  }
}

export const wishlistController = new WishlistController();
