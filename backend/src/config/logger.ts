import pino from 'pino';
import { env } from './env.js';

export const logger = pino({
  level: env.LOG_LEVEL,
  transport:
    env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  base: {
    service: 'ruthved-organic-backend',
    env: env.NODE_ENV,
  },
  redact: ['req.headers.authorization', 'req.headers["x-razorpay-signature"]', 'password', 'token', 'refreshToken'],
});
