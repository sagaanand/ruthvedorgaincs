import { Router } from 'express';
import { reviewController } from './review.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createReviewSchema, moderateReviewSchema } from './review.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// Public review reading & reporting
router.get('/product/:productId', reviewController.getProductReviews);
router.post('/:id/report', reviewController.reportReview);

// Customer review submission
router.post('/', authenticate, validate(createReviewSchema), reviewController.createReview);

// Admin moderation
router.get(
  '/admin/all',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  reviewController.getAdminReviews
);

router.patch(
  '/admin/:id/moderate',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  validate(moderateReviewSchema),
  reviewController.moderateReview
);

router.delete(
  '/admin/:id',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  reviewController.deleteReview
);

export default router;
