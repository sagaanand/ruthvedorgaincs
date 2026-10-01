import multer from 'multer';
import { BadRequestError } from '../utils/errors.js';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { env } from '../config/env.js';

const storage = multer.memoryStorage();

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError('Only JPEG, PNG, WebP, and AVIF image files are allowed.'));
  }
};

export const uploadSingle = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).single('image');

export const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array('images', 8);

/**
 * Optimizes an uploaded buffer to WebP format and saves locally or returns buffer
 */
export async function processAndSaveImage(
  buffer: Buffer,
  filenamePrefix = 'img'
): Promise<{ filename: string; relativePath: string; url: string }> {
  const uploadDir = path.resolve(process.cwd(), env.UPLOAD_DIR);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${filenamePrefix}-${uniqueSuffix}.webp`;
  const filePath = path.join(uploadDir, filename);

  // Resize to max width 1600px, quality 85, convert to webp
  await sharp(buffer)
    .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(filePath);

  const relativePath = `/uploads/${filename}`;
  const url = `${env.APP_URL}${relativePath}`;

  return {
    filename,
    relativePath,
    url,
  };
}
