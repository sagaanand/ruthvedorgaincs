import { Router } from 'express';
import { notificationsController } from './notifications.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { notificationListQuerySchema, testNotificationSchema } from './notifications.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

router.use(authenticate);
router.use(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN));

router.get('/', validate(notificationListQuerySchema, 'query'), notificationsController.getNotifications);
router.post('/test', validate(testNotificationSchema, 'body'), notificationsController.testSend);
router.post('/:id/retry', notificationsController.retryNotification);

export default router;
