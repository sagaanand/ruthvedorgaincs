import { Router } from 'express';
import { homepageController } from './homepage.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { bannerSchema, faqSchema, testimonialSchema } from './homepage.schema.js';
import { ROLES } from '../../config/constants.js';

const router = Router();

// Public storefront content
router.get('/content', homepageController.getStorefrontContent);

// Banners
router.get('/banners', homepageController.getBanners);
router.post(
  '/banners',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  validate(bannerSchema),
  homepageController.createBanner
);
router.delete(
  '/banners/:id',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  homepageController.deleteBanner
);

// FAQs
router.get('/faqs', homepageController.getFaqs);
router.post(
  '/faqs',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  validate(faqSchema),
  homepageController.createFaq
);
router.delete(
  '/faqs/:id',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  homepageController.deleteFaq
);

// Testimonials
router.get('/testimonials', homepageController.getTestimonials);
router.post(
  '/testimonials',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  validate(testimonialSchema),
  homepageController.createTestimonial
);
router.delete(
  '/testimonials/:id',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.CONTENT_MANAGER),
  homepageController.deleteTestimonial
);

export default router;
