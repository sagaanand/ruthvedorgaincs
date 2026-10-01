import { Request, Response, NextFunction } from 'express';
import { settingsService } from './settings.service.js';
import { sendSuccess } from '../../utils/response.js';

export class SettingsController {
  async getPublicSettings(_req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await settingsService.getPublicSettings();
      return sendSuccess(res, settings);
    } catch (error) {
      next(error);
    }
  }

  async getAllSettings(_req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await settingsService.getAllSettings();
      return sendSuccess(res, settings);
    } catch (error) {
      next(error);
    }
  }

  async upsertSetting(req: Request, res: Response, next: NextFunction) {
    try {
      const { key, value, description, isPublic } = req.body;
      const setting = await settingsService.upsertSetting(key, value, description, isPublic);
      return sendSuccess(res, setting, 'Setting updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const settingsController = new SettingsController();
