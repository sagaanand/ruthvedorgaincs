import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword } from '../src/utils/hash.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  safeVerifyAccessToken,
} from '../src/utils/token.js';
import { UserRole } from '@prisma/client';

describe('Authentication & Security Utilities', () => {
  it('should securely hash passwords and verify correct passwords', async () => {
    const raw = 'RuthvedOrganic@2025!';
    const hashed = await hashPassword(raw);

    expect(hashed).not.toBe(raw);
    expect(hashed.length).toBeGreaterThan(20);

    const isMatch = await comparePassword(raw, hashed);
    expect(isMatch).toBe(true);

    const isWrong = await comparePassword('WrongPassword123', hashed);
    expect(isWrong).toBe(false);
  });

  it('should generate valid signed access and refresh tokens and decode payload', () => {
    const user = {
      userId: 'test-user-uuid-1234',
      email: 'aditi@ruthvedorganic.com',
      role: UserRole.CUSTOMER,
    };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.userId, user.email, user.role);

    expect(typeof accessToken).toBe('string');
    expect(typeof refreshToken).toBe('string');

    const decodedAccess = verifyAccessToken(accessToken);
    expect(decodedAccess).not.toBeNull();
    expect(decodedAccess?.userId).toBe(user.userId);
    expect(decodedAccess?.email).toBe(user.email);
    expect(decodedAccess?.role).toBe(UserRole.CUSTOMER);

    const decodedRefresh = verifyRefreshToken(refreshToken);
    expect(decodedRefresh).not.toBeNull();
    expect(decodedRefresh?.userId).toBe(user.userId);
  });

  it('should reject tampered or invalid tokens', () => {
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalidpayload.invalidsig';
    const decoded = safeVerifyAccessToken(fakeToken);
    expect(decoded).toBeNull();
  });
});
