import { Request, Response, NextFunction } from 'express';
import { reviewService } from './review.service.js';
import { sendCreated, sendPaginated, sendSuccess } from '../../utils/response.js';

export class ReviewController {
  async getProductReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const result = await reviewService.getProductReviews(req.params.productId, page, limit);
      return sendPaginated(res, result.reviews, result.page, result.limit, result.total);
    } catch (error) {
      next(error);
    }
  }

  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const review = await reviewService.createReview(req.user!.userId, req.body);
      return sendCreated(
        res,
        review,
        'Review submitted successfully and will appear once approved by our moderation team.'
      );
    } catch (error) {
      next(error);
    }
  }

  async reportReview(req: Request, res: Response, next: NextFunction) {
    try {
      await reviewService.reportReview(req.params.id);
      return sendSuccess(res, null, 'Review reported for administrative review');
    } catch (error) {
      next(error);
    }
  }

  async getAdminReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const status = req.query.status as any;
      const result = await reviewService.getAdminReviews({ page, limit, status });
      return sendPaginated(res, result.reviews, result.page, result.limit, result.total);
    } catch (error) {
      next(error);
    }
  }

  async moderateReview(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await reviewService.moderateReview(req.params.id, req.body.isApproved);
      return sendSuccess(res, updated, 'Review status updated');
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      await reviewService.deleteReview(req.params.id);
      return sendSuccess(res, null, 'Review deleted');
    } catch (error) {
      next(error);
    }
  }
}

export const reviewController = new ReviewController();
