import { Router } from 'express';
import { inventoryController } from './inventory.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { adjustStockSchema } from './inventory.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

router.use(authenticate);
router.use(authorize(ROLES.ADMIN, ROLES.INVENTORY_MANAGER));

router.get('/', inventoryController.getInventory);
router.get('/low-stock', inventoryController.getLowStockAlerts);
router.get('/movements', inventoryController.getMovements);
router.post('/adjust', validate(adjustStockSchema), inventoryController.adjustStock);

export default router;
