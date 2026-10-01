import { Router } from 'express';
import { categoryController } from './category.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createCategorySchema, updateCategorySchema } from './category.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:slug', categoryController.getCategoryBySlug);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  validate(createCategorySchema),
  categoryController.createCategory
);
router.put(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  validate(updateCategorySchema),
  categoryController.updateCategory
);
router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  categoryController.deleteCategory
);
router.patch(
  '/:id/status',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  categoryController.toggleStatus
);

export default router;
