import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { connectDatabase, disconnectDatabase } from './config/prisma.js';
import http from 'http';

async function bootstrap() {
  logger.info('Starting Ruthved Organic Backend Server...');

  // Connect to Database
  try {
    await connectDatabase();
    logger.info('Database connection established successfully');
  } catch (error) {
    logger.warn({ error }, 'Database connection could not be established immediately. Server will start in resilient mode.');
  }

  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.info(`=======================================================`);
    logger.info(`🌾 Ruthved Organic Backend Server running on port ${env.PORT}`);
    logger.info(`🌐 Environment: ${env.NODE_ENV}`);
    logger.info(`📖 Swagger API Docs: http://localhost:${env.PORT}/api/docs`);
    logger.info(`🩺 Health Check:     http://localhost:${env.PORT}/health`);
    logger.info(`=======================================================`);
  });

  // Graceful shutdown handlers
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Gracefully shutting down...`);

    server.close(async () => {
      logger.info('HTTP server closed');
      try {
        await disconnectDatabase();
        logger.info('Prisma disconnected');
      } catch (err) {
        logger.error({ err }, 'Error disconnecting Prisma during shutdown');
      }
      process.exit(0);
    });

    // Force exit after 10s if hanging
    setTimeout(() => {
      logger.error('Graceful shutdown timed out. Forcing termination.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.fatal({ err }, 'Fatal error during server bootstrap');
  process.exit(1);
});
