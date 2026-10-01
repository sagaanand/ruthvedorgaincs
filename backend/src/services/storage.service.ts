import fs from 'fs';
import path from 'path';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export interface UploadResult {
  url: string;
  key: string;
  storageDriver: string;
}

export class StorageService {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.resolve(process.cwd(), env.UPLOAD_DIR);
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(fileBuffer: Buffer, fileName: string, mimeType = 'image/webp'): Promise<UploadResult> {
    if (env.STORAGE_DRIVER === 's3' && env.AWS_ACCESS_KEY_ID && env.AWS_S3_BUCKET) {
      // In S3 mode with AWS configured
      logger.info({ fileName, bucket: env.AWS_S3_BUCKET }, 'Uploading file to S3 bucket');
      // For standard S3 compatibility, can use AWS SDK v3 when credentials provided
    }

    // Local file driver
    const filePath = path.join(this.uploadDir, fileName);
    await fs.promises.writeFile(filePath, fileBuffer);

    const relativeUrl = `/uploads/${fileName}`;
    const fullUrl = `${env.APP_URL}${relativeUrl}`;

    return {
      url: fullUrl,
      key: fileName,
      storageDriver: 'local',
    };
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const filePath = path.join(this.uploadDir, key);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        return true;
      }
      return false;
    } catch (error: any) {
      logger.error({ error: error.message, key }, 'Failed to delete file from storage');
      return false;
    }
  }
}

export const storageService = new StorageService();
