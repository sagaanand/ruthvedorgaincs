import { prisma } from '../../config/prisma.js';
import { NotFoundError, ForbiddenError } from '../../utils/errors.js';

export class AddressService {
  async getAddresses(userId: string) {
    return prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async createAddress(userId: string, data: any) {
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    // If it's the user's first address, automatically make it default
    const count = await prisma.address.count({ where: { userId } });
    const isDefault = data.isDefault || count === 0;

    return prisma.address.create({
      data: {
        ...data,
        isDefault,
        userId,
      },
    });
  }

  async updateAddress(userId: string, addressId: string, data: any) {
    const existing = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!existing) {
      throw new NotFoundError('Address not found');
    }

    if (existing.userId !== userId) {
      throw new ForbiddenError('You can only update your own address');
    }

    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId, id: { not: addressId } },
        data: { isDefault: false },
      });
    }

    return prisma.address.update({
      where: { id: addressId },
      data,
    });
  }

  async deleteAddress(userId: string, addressId: string) {
    const existing = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!existing) {
      throw new NotFoundError('Address not found');
    }

    if (existing.userId !== userId) {
      throw new ForbiddenError('You can only delete your own address');
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    return true;
  }

  async setDefault(userId: string, addressId: string) {
    await prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });

    return prisma.address.update({
      where: { id: addressId },
      data: { isDefault: true },
    });
  }
}

export const addressService = new AddressService();
