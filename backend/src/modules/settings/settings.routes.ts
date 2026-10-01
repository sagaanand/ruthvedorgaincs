import { Router } from 'express';
import { settingsController } from './settings.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// Public store parameters (free shipping threshold, currency, announcement)
router.get('/public', settingsController.getPublicSettings);

// Admin configuration
router.get('/', authenticate, authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN), settingsController.getAllSettings);
router.post('/', authenticate, authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN), settingsController.upsertSetting);

export default router;
