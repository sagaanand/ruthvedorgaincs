import { Router } from 'express';
import { adminController } from './admin.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

router.use(authenticate);
router.use(authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN));

router.get('/dashboard', adminController.getDashboard);
router.get('/customers', adminController.getCustomers);
router.patch('/customers/:id/toggle-status', adminController.toggleCustomerStatus);
router.get('/audit-logs', adminController.getAuditLogs);

export default router;
