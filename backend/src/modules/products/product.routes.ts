import { Router } from 'express';
import { productController } from './product.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createProductSchema, updateProductSchema, productQuerySchema } from './product.schema.js';
import { uploadSingle } from '../../middleware/upload.middleware.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// Public routes
router.get('/', validate(productQuerySchema), productController.getProducts);
router.get('/:slug', productController.getProductBySlug);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.INVENTORY_MANAGER),
  validate(createProductSchema),
  productController.createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.INVENTORY_MANAGER),
  validate(updateProductSchema),
  productController.updateProduct
);

router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  productController.deleteProduct
);

router.post(
  '/upload-image',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  uploadSingle,
  productController.uploadImage
);

export default router;
