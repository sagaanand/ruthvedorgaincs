import { Router } from 'express';
import { addressController } from './address.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { addressSchema, updateAddressSchema } from './address.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', addressController.getAddresses);
router.post('/', validate(addressSchema), addressController.createAddress);
router.put('/:id', validate(updateAddressSchema), addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);
router.patch('/:id/default', addressController.setDefault);

export default router;
