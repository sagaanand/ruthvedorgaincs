import { Router } from 'express';
import { cartController } from './cart.controller.js';
import { optionalAuth, authenticate } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { addToCartSchema, updateCartItemSchema, mergeCartSchema } from './cart.schema.js';

const router = Router();

// Guest & authenticated operations
router.get('/', optionalAuth, cartController.getCart);
router.post('/items', optionalAuth, validate(addToCartSchema), cartController.addItem);
router.patch('/items/:id', optionalAuth, validate(updateCartItemSchema), cartController.updateItem);
router.delete('/items/:id', optionalAuth, cartController.removeItem);
router.delete('/', optionalAuth, cartController.clearCart);

// Merge after login
router.post('/merge', authenticate, validate(mergeCartSchema), cartController.mergeCart);

export default router;
