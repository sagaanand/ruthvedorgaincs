import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';
import { logger } from '../config/logger.js';
import { env } from '../config/env.js';

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Normalize Prisma errors
  if (err.code === 'P2002') {
    const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'field';
    err = new AppError(`A record with this ${target} already exists.`, 409);
  } else if (err.code === 'P2025') {
    err = new AppError('The requested database record was not found.', 404);
  }

  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;
  const message = isOperational ? err.message : 'Internal Server Error';

  if (statusCode >= 500) {
    logger.error(
      {
        err,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
      'Unhandled Server Error'
    );
  } else {
    logger.warn(
      {
        statusCode,
        message: err.message,
        method: req.method,
        url: req.originalUrl,
      },
      'Operational Client Error'
    );
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.errors ? { errors: err.errors } : {}),
    ...(env.NODE_ENV === 'development' && statusCode >= 500 ? { stack: err.stack } : {}),
  });
}
