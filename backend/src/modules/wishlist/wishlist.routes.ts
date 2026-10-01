import { Router } from 'express';
import { wishlistController } from './wishlist.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { addToWishlistSchema } from './wishlist.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', wishlistController.getWishlist);
router.post('/', validate(addToWishlistSchema), wishlistController.addProduct);
router.delete('/:productId', wishlistController.removeProduct);
router.post('/:productId/move-to-cart', wishlistController.moveToCart);

export default router;
