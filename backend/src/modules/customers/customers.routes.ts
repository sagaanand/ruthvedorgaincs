import { Router } from 'express';
import { customersController } from './customers.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { customerListQuerySchema, updateCustomerStatusSchema } from './customers.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

router.use(authenticate);
router.use(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CUSTOMER_SUPPORT));

router.get('/', validate(customerListQuerySchema, 'query'), customersController.getCustomers);
router.get('/export', customersController.exportCustomers);
router.get('/:id', customersController.getCustomerById);
router.patch(
  '/:id/status',
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  validate(updateCustomerStatusSchema, 'body'),
  customersController.updateCustomerStatus
);

export default router;
