import { Router } from 'express';
import { orderController } from './order.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  checkoutSchema,
  updateOrderStatusSchema,
  cancelOrderSchema,
  orderQuerySchema,
} from './order.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// Checkout supports both guest checkout and logged in user
router.post('/checkout', optionalAuth, validate(checkoutSchema), orderController.checkout);

// Customer endpoints
router.get('/my-orders', authenticate, orderController.getMyOrders);
router.get('/:id', optionalAuth, orderController.getOrderById);
router.get('/:id/invoice', optionalAuth, orderController.getInvoice);
router.post('/:id/cancel', authenticate, validate(cancelOrderSchema), orderController.cancelOrder);

// Admin endpoints
router.get(
  '/admin/all',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.ORDER_MANAGER),
  validate(orderQuerySchema),
  orderController.getAdminOrders
);

router.patch(
  '/admin/:id/status',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.ORDER_MANAGER),
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

export default router;
