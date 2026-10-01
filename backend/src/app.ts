import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { swaggerSpec } from './config/swagger.js';
import { errorHandler } from './middleware/error.middleware.js';
import { NotFoundError } from './utils/errors.js';

// Route imports
import authRouter from './modules/auth/auth.routes.js';
import usersRouter from './modules/users/user.routes.js';
import addressesRouter from './modules/addresses/address.routes.js';
import categoriesRouter from './modules/categories/category.routes.js';
import productsRouter from './modules/products/product.routes.js';
import inventoryRouter from './modules/inventory/inventory.routes.js';
import cartRouter from './modules/cart/cart.routes.js';
import wishlistRouter from './modules/wishlist/wishlist.routes.js';
import couponsRouter from './modules/coupons/coupon.routes.js';
import ordersRouter from './modules/orders/order.routes.js';
import paymentsRouter from './modules/payments/payment.routes.js';
import shippingRouter from './modules/shipping/shipping.routes.js';
import reviewsRouter from './modules/reviews/review.routes.js';
import homepageRouter from './modules/homepage/homepage.routes.js';
import adminRouter from './modules/admin/admin.routes.js';
import analyticsRouter from './modules/analytics/analytics.routes.js';
import customersRouter from './modules/customers/customers.routes.js';
import notificationsRouter from './modules/notifications/notifications.routes.js';
import settingsRouter from './modules/settings/settings.routes.js';

export function createApp(): Application {
  const app = express();

  // 1. Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false, // Allows Swagger UI to render smoothly
    })
  );

  // 2. Strict CORS Configuration
  const allowedOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS blocked for origin: ${origin}`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    })
  );

  // 3. Body Parsers with Raw Body preservation for Webhook verification (Razorpay HMAC)
  app.use(
    express.json({
      limit: '10mb',
      verify: (req: any, _res, buf) => {
        req.rawBody = buf;
      },
    })
  );
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 4. Cookies
  app.use(cookieParser(env.COOKIE_SECRET));

  // 5. Request Logging (exclude healthcheck to keep logs clean)
  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.path !== '/health') {
      logger.info({ method: req.method, url: req.url, ip: req.ip }, 'Incoming Request');
    }
    next();
  });

  // 6. Static Uploads
  const uploadsDir = path.resolve(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadsDir));

  // 7. Interactive API Documentation (Swagger UI)
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
  app.get('/api/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // 8. Health Check
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      service: 'Ruthved Organic API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    });
  });

  // 9. Root Route
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      name: 'Ruthved Organic E-Commerce API',
      version: '1.0.0',
      description: 'Production backend for premium A2 Desi Cow Bilona Ghee, wood-pressed oils & wild honey.',
      documentation: '/api/docs',
      health: '/health',
    });
  });

  // 10. API v1 Router Mount
  const apiV1 = express.Router();
  apiV1.use('/auth', authRouter);
  apiV1.use('/users', usersRouter);
  apiV1.use('/addresses', addressesRouter);
  apiV1.use('/categories', categoriesRouter);
  apiV1.use('/products', productsRouter);
  apiV1.use('/inventory', inventoryRouter);
  apiV1.use('/cart', cartRouter);
  apiV1.use('/wishlist', wishlistRouter);
  apiV1.use('/coupons', couponsRouter);
  apiV1.use('/orders', ordersRouter);
  apiV1.use('/payments', paymentsRouter);
  apiV1.use('/shipping', shippingRouter);
  apiV1.use('/reviews', reviewsRouter);
  apiV1.use('/homepage', homepageRouter);
  apiV1.use('/admin', adminRouter);
  apiV1.use('/analytics', analyticsRouter);
  apiV1.use('/customers', customersRouter);
  apiV1.use('/notifications', notificationsRouter);
  apiV1.use('/settings', settingsRouter);

  app.use('/api/v1', apiV1);

  // 11. 404 Fallback Handler
  app.use((req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
  });

  // 12. Centralized Error Handler
  app.use(errorHandler);

  return app;
}

export const app = createApp();
