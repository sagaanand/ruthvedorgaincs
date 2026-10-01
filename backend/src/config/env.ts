import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

// Load environment variables from backend/.env or root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  API_PREFIX: z.string().default('/api/v1'),
  APP_URL: z.string().default('http://localhost:5000'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  CORS_ORIGIN: z.string().default('http://localhost:5173,http://localhost:3000'),

  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/ruthved_organic?schema=public'),

  REDIS_URL: z.string().default('redis://localhost:6379'),
  ENABLE_REDIS_JOBS: z.coerce.boolean().default(false),

  JWT_ACCESS_SECRET: z.string().min(16).default('ruthved_access_secret_key_default_32_characters_12345'),
  JWT_REFRESH_SECRET: z.string().min(16).default('ruthved_refresh_secret_key_default_32_characters_67890'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  COOKIE_SECRET: z.string().default('ruthved_cookie_secret_key_32_characters_long_999'),

  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),

  RAZORPAY_KEY_ID: z.string().default('rzp_test_placeholder'),
  RAZORPAY_KEY_SECRET: z.string().default('rzp_secret_placeholder'),
  RAZORPAY_WEBHOOK_SECRET: z.string().default('rzp_webhook_secret_placeholder'),

  STORAGE_DRIVER: z.enum(['local', 's3']).default('local'),
  UPLOAD_DIR: z.string().default('./uploads'),
  AWS_ACCESS_KEY_ID: z.string().optional().default(''),
  AWS_SECRET_ACCESS_KEY: z.string().optional().default(''),
  AWS_REGION: z.string().default('ap-south-1'),
  AWS_S3_BUCKET: z.string().default('ruthved-assets'),
  AWS_S3_ENDPOINT: z.string().optional().default(''),

  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z.coerce.boolean().default(false),
  SMTP_USER: z.string().default('orders@ruthvedorganic.com'),
  SMTP_PASS: z.string().default('app_password'),
  EMAIL_FROM_NAME: z.string().default('Ruthved Organic'),
  EMAIL_FROM_ADDRESS: z.string().default('orders@ruthvedorganic.com'),

  WHATSAPP_ENABLED: z.coerce.boolean().default(false),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional().default(''),
  WHATSAPP_ACCESS_TOKEN: z.string().optional().default(''),
  WHATSAPP_TEMPLATE_NAMESPACE: z.string().optional().default(''),

  DEFAULT_CURRENCY: z.string().default('INR'),
  FREE_SHIPPING_THRESHOLD: z.coerce.number().default(750),
  STANDARD_SHIPPING_FEE: z.coerce.number().default(70),
  DEFAULT_TAX_RATE: z.coerce.number().default(0.05),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid backend environment configuration:', parsed.error.format());
  throw new Error('Environment variable validation failed');
}

export const env = parsed.data;
