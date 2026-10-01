import { Request, Response, NextFunction } from 'express';
import { homepageService } from './homepage.service.js';
import { sendCreated, sendSuccess } from '../../utils/response.js';

export class HomepageController {
  async getStorefrontContent(_req: Request, res: Response, next: NextFunction) {
    try {
      const content = await homepageService.getStorefrontContent();
      return sendSuccess(res, content);
    } catch (error) {
      next(error);
    }
  }

  // Banners
  async getBanners(_req: Request, res: Response, next: NextFunction) {
    try {
      const banners = await homepageService.getBanners();
      return sendSuccess(res, banners);
    } catch (error) {
      next(error);
    }
  }

  async createBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const banner = await homepageService.createBanner(req.body);
      return sendCreated(res, banner, 'Banner created successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteBanner(req: Request, res: Response, next: NextFunction) {
    try {
      await homepageService.deleteBanner(req.params.id);
      return sendSuccess(res, null, 'Banner deleted');
    } catch (error) {
      next(error);
    }
  }

  // FAQs
  async getFaqs(_req: Request, res: Response, next: NextFunction) {
    try {
      const faqs = await homepageService.getFaqs();
      return sendSuccess(res, faqs);
    } catch (error) {
      next(error);
    }
  }

  async createFaq(req: Request, res: Response, next: NextFunction) {
    try {
      const faq = await homepageService.createFaq(req.body);
      return sendCreated(res, faq, 'FAQ created');
    } catch (error) {
      next(error);
    }
  }

  async deleteFaq(req: Request, res: Response, next: NextFunction) {
    try {
      await homepageService.deleteFaq(req.params.id);
      return sendSuccess(res, null, 'FAQ deleted');
    } catch (error) {
      next(error);
    }
  }

  // Testimonials
  async getTestimonials(_req: Request, res: Response, next: NextFunction) {
    try {
      const testimonials = await homepageService.getTestimonials();
      return sendSuccess(res, testimonials);
    } catch (error) {
      next(error);
    }
  }

  async createTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const testimonial = await homepageService.createTestimonial(req.body);
      return sendCreated(res, testimonial, 'Testimonial created');
    } catch (error) {
      next(error);
    }
  }

  async deleteTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      await homepageService.deleteTestimonial(req.params.id);
      return sendSuccess(res, null, 'Testimonial deleted');
    } catch (error) {
      next(error);
    }
  }
}

export const homepageController = new HomepageController();
