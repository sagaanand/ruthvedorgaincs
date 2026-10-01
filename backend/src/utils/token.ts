import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  family?: string;
}

export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as any,
  });
}

export function signRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
  });
}

export const generateAccessToken = signAccessToken;

export function generateRefreshToken(userId: string, email = '', role = 'CUSTOMER', family?: string): string {
  return signRefreshToken({ userId, email, role, family });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
}

export function safeVerifyAccessToken(token: string): TokenPayload | null {
  try {
    return verifyAccessToken(token);
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
}

export function safeVerifyRefreshToken(token: string): TokenPayload | null {
  try {
    return verifyRefreshToken(token);
  } catch {
    return null;
  }
}
