import { prisma } from '../../config/prisma.js';

export class SettingsService {
  async getPublicSettings() {
    const settings = await prisma.storeSetting.findMany({
      where: { isPublic: true },
    });
    const map: Record<string, any> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return map;
  }

  async getAllSettings() {
    return prisma.storeSetting.findMany({
      orderBy: { key: 'asc' },
    });
  }

  async upsertSetting(key: string, value: any, description?: string, isPublic = false) {
    return prisma.storeSetting.upsert({
      where: { key },
      create: { key, value, description, isPublic },
      update: { value, description, isPublic },
    });
  }
}

export const settingsService = new SettingsService();
