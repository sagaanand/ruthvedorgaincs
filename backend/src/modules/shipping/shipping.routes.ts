import { Router } from 'express';
import { shippingController } from './shipping.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { checkPincodeSchema, updateShipmentSchema } from './shipping.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// Public serviceability check
router.get('/serviceability', validate(checkPincodeSchema), shippingController.checkPincode);
router.get('/track/:orderId', shippingController.getTracking);

// Admin shipment updates
router.post(
  '/update',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.ORDER_MANAGER),
  validate(updateShipmentSchema),
  shippingController.updateShipment
);

export default router;
