import { Request, Response, NextFunction } from 'express';
import { cartService } from './cart.service.js';
import { sendSuccess } from '../../utils/response.js';

export class CartController {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const guestToken = req.query.guestToken as string | undefined;
      const couponCode = req.query.couponCode as string | undefined;
      const summary = await cartService.getCartSummary(req.user?.userId, guestToken, couponCode);
      return sendSuccess(res, summary);
    } catch (error) {
      next(error);
    }
  }

  async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, variantId, quantity, guestToken } = req.body;
      const summary = await cartService.addItem({
        productId,
        variantId,
        quantity: quantity || 1,
        userId: req.user?.userId,
        guestToken,
      });
      return sendSuccess(res, summary, 'Item added to cart');
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const guestToken = req.query.guestToken as string | undefined;
      const summary = await cartService.updateItemQuantity(
        req.params.id,
        req.body.quantity,
        req.user?.userId,
        guestToken
      );
      return sendSuccess(res, summary, 'Cart item updated');
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req: Request, res: Response, next: NextFunction) {
    try {
      const guestToken = req.query.guestToken as string | undefined;
      const summary = await cartService.removeItem(req.params.id, req.user?.userId, guestToken);
      return sendSuccess(res, summary, 'Item removed from cart');
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      const guestToken = req.query.guestToken as string | undefined;
      const summary = await cartService.clearCart(req.user?.userId, guestToken);
      return sendSuccess(res, summary, 'Cart cleared');
    } catch (error) {
      next(error);
    }
  }

  async mergeCart(req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await cartService.mergeGuestCart(req.user!.userId, req.body.guestToken);
      return sendSuccess(res, summary, 'Guest cart merged successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const cartController = new CartController();
