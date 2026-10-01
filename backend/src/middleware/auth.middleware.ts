import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token.js';
import { UnauthorizedError } from '../utils/errors.js';
import { prisma } from '../config/prisma.js';
import { UserRole } from '@prisma/client';
import '../types/index.js';

export async function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedError('Authentication required. No access token provided.');
    }

    const payload = verifyAccessToken(token);

    // Verify user is still active in database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true, phone: true, name: true, isActive: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedError('User account not found or deactivated.');
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
      phone: user.phone,
      name: user.name,
    };

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      next(new UnauthorizedError('Access token has expired. Please refresh your token.'));
    } else if (error.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Invalid access token.'));
    } else {
      next(error);
    }
  }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token) {
      try {
        const payload = verifyAccessToken(token);
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          select: { id: true, email: true, role: true, phone: true, name: true, isActive: true },
        });

        if (user && user.isActive) {
          req.user = {
            userId: user.id,
            email: user.email,
            role: user.role as UserRole,
            phone: user.phone,
            name: user.name,
          };
        }
      } catch {
        // Silently ignore expired/invalid token in optional auth
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}
