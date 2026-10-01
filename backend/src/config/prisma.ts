import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';
import { env } from './env.js';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaGlobal ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development'
        ? [
            { emit: 'event', level: 'query' },
            { emit: 'event', level: 'error' },
            { emit: 'event', level: 'warn' },
          ]
        : [{ emit: 'event', level: 'error' }],
  });

if (env.NODE_ENV === 'development') {
  // Log slow queries or errors in dev
  (prisma as any).$on?.('error', (e: any) => {
    logger.error({ err: e }, 'Prisma DB Error');
  });
}

if (env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export async function connectDatabase(): Promise<boolean> {
  try {
    await prisma.$connect();
    logger.info('✅ PostgreSQL connected successfully via Prisma');
    return true;
  } catch (error: any) {
    logger.warn({ error: error.message }, '⚠️ PostgreSQL connection warning (operating in resilient mode if offline)');
    return false;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
  logger.info('Prisma disconnected gracefully');
}
