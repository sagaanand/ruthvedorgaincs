import { Router } from 'express';
import { couponController } from './coupon.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createCouponSchema, updateCouponSchema, validateCouponSchema } from './coupon.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// Public validation
router.post('/validate', optionalAuth, validate(validateCouponSchema), couponController.validateCoupon);

// Admin management
router.get('/', authenticate, authorize(ROLES.ADMIN, ROLES.ORDER_MANAGER), couponController.getCoupons);
router.post('/', authenticate, authorize(ROLES.ADMIN), validate(createCouponSchema), couponController.createCoupon);
router.put('/:id', authenticate, authorize(ROLES.ADMIN), validate(updateCouponSchema), couponController.updateCoupon);
router.delete('/:id', authenticate, authorize(ROLES.ADMIN), couponController.deleteCoupon);

export default router;
