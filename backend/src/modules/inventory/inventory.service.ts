import { prisma } from '../../config/prisma.js';
import { BadRequestError, NotFoundError } from '../../utils/errors.js';
import { InventoryReason } from '@prisma/client';

export class InventoryService {
  async getInventoryList() {
    return prisma.inventory.findMany({
      include: {
        product: { select: { id: true, name: true, sku: true } },
        variant: { select: { id: true, name: true, sku: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getLowStockAlerts() {
    return prisma.inventory.findMany({
      where: {
        currentStock: { lte: 10 },
      },
      include: {
        product: { select: { id: true, name: true, sku: true } },
        variant: { select: { id: true, name: true, sku: true } },
      },
    });
  }

  async getMovements(params: { productId?: string; page?: number; limit?: number }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where = params.productId ? { productId: params.productId } : undefined;

    const [movements, total] = await Promise.all([
      prisma.inventoryMovement.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.inventoryMovement.count({ where }),
    ]);

    return { movements, total, page, limit };
  }

  async adjustStock(
    data: {
      productId: string;
      variantId?: string | null;
      quantityChange: number;
      reason: InventoryReason;
      notes?: string;
    },
    actorId?: string
  ) {
    return prisma.$transaction(async tx => {
      let inventory = await tx.inventory.findFirst({
        where: {
          productId: data.productId,
          variantId: data.variantId || null,
        },
      });

      if (!inventory) {
        inventory = await tx.inventory.create({
          data: {
            productId: data.productId,
            variantId: data.variantId,
            currentStock: 0,
            availableStock: 0,
          },
        });
      }

      const previousStock = inventory.currentStock;
      const resultingStock = previousStock + data.quantityChange;

      if (resultingStock < 0) {
        throw new BadRequestError(
          `Cannot reduce stock by ${Math.abs(data.quantityChange)}. Current stock is only ${previousStock}.`
        );
      }

      const updatedInventory = await tx.inventory.update({
        where: { id: inventory.id },
        data: {
          currentStock: resultingStock,
          availableStock: resultingStock - inventory.reservedStock,
        },
      });

      // Update variant or product stock cache
      if (data.variantId) {
        await tx.productVariant.update({
          where: { id: data.variantId },
          data: { stock: resultingStock },
        });
      }

      // Log movement in ledger
      await tx.inventoryMovement.create({
        data: {
          inventoryId: inventory.id,
          productId: data.productId,
          variantId: data.variantId,
          quantityChange: data.quantityChange,
          previousStock,
          resultingStock,
          reason: data.reason,
          actorId,
          notes: data.notes,
        },
      });

      return updatedInventory;
    });
  }

  /**
   * Reserves stock atomically during checkout.
   */
  async reserveStock(
    items: Array<{ productId: string; variantId?: string | null; quantity: number }>,
    orderId: string
  ) {
    return prisma.$transaction(async tx => {
      for (const item of items) {
        const inventory = await tx.inventory.findFirst({
          where: {
            productId: item.productId,
            variantId: item.variantId || null,
          },
        });

        if (!inventory) {
          throw new BadRequestError('Inventory record not found for product');
        }

        if (inventory.availableStock < item.quantity) {
          throw new BadRequestError(
            `Insufficient stock for item. Available: ${inventory.availableStock}, Requested: ${item.quantity}`
          );
        }

        const newReserved = inventory.reservedStock + item.quantity;
        const newAvailable = inventory.currentStock - newReserved;

        await tx.inventory.update({
          where: { id: inventory.id },
          data: {
            reservedStock: newReserved,
            availableStock: newAvailable,
          },
        });

        await tx.inventoryMovement.create({
          data: {
            inventoryId: inventory.id,
            productId: item.productId,
            variantId: item.variantId,
            quantityChange: 0,
            previousStock: inventory.currentStock,
            resultingStock: inventory.currentStock,
            reason: InventoryReason.CHECKOUT_RESERVATION,
            referenceOrderId: orderId,
            notes: `Reserved ${item.quantity} units for order ${orderId}`,
          },
        });
      }
    });
  }

  /**
   * Releases stock reservation if payment fails or expires.
   */
  async releaseReservation(orderId: string) {
    return prisma.$transaction(async tx => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order) return;

      for (const item of order.items) {
        const inventory = await tx.inventory.findFirst({
          where: {
            productId: item.productId,
            variantId: item.variantId,
          },
        });

        if (inventory) {
          const newReserved = Math.max(0, inventory.reservedStock - item.quantity);
          const newAvailable = inventory.currentStock - newReserved;

          await tx.inventory.update({
            where: { id: inventory.id },
            data: {
              reservedStock: newReserved,
              availableStock: newAvailable,
            },
          });

          await tx.inventoryMovement.create({
            data: {
              inventoryId: inventory.id,
              productId: item.productId,
              variantId: item.variantId,
              quantityChange: 0,
              previousStock: inventory.currentStock,
              resultingStock: inventory.currentStock,
              reason: InventoryReason.RESERVATION_RELEASE,
              referenceOrderId: orderId,
              notes: `Released reservation of ${item.quantity} units for order ${orderId}`,
            },
          });
        }
      }
    });
  }

  /**
   * Deducts stock after confirmed payment.
   */
  async deductStock(orderId: string) {
    return prisma.$transaction(async tx => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order) return;

      for (const item of order.items) {
        const inventory = await tx.inventory.findFirst({
          where: {
            productId: item.productId,
            variantId: item.variantId,
          },
        });

        if (inventory) {
          const previousStock = inventory.currentStock;
          const resultingStock = Math.max(0, previousStock - item.quantity);
          const newReserved = Math.max(0, inventory.reservedStock - item.quantity);
          const newAvailable = resultingStock - newReserved;

          await tx.inventory.update({
            where: { id: inventory.id },
            data: {
              currentStock: resultingStock,
              reservedStock: newReserved,
              availableStock: newAvailable,
            },
          });

          if (item.variantId) {
            await tx.productVariant.update({
              where: { id: item.variantId },
              data: { stock: resultingStock },
            });
          }

          await tx.inventoryMovement.create({
            data: {
              inventoryId: inventory.id,
              productId: item.productId,
              variantId: item.variantId,
              quantityChange: -item.quantity,
              previousStock,
              resultingStock,
              reason: InventoryReason.SALE_DEDUCTION,
              referenceOrderId: orderId,
              notes: `Sold ${item.quantity} units for order ${orderId}`,
            },
          });
        }
      }
    });
  }
}

export const inventoryService = new InventoryService();
