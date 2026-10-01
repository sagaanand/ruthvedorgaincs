import { prisma } from '../../config/prisma.js';
import { NotFoundError } from '../../utils/errors.js';
import { dispatchNotificationJob } from '../../jobs/queue.js';
import { OrderStatus, ShipmentStatus } from '@prisma/client';

export class ShippingService {
  checkServiceability(pincode: string) {
    const cleanPin = pincode.replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      return { serviceable: false, message: 'Invalid 6-digit PIN code format.' };
    }

    const firstDigit = cleanPin.charAt(0);
    // India Post zones: 5 = South (Karnataka, AP, Telangana), 6 = Kerala, TN
    const isLocalKarnataka = cleanPin.startsWith('56') || cleanPin.startsWith('57') || cleanPin.startsWith('58');

    return {
      serviceable: true,
      pincode: cleanPin,
      region: isLocalKarnataka ? 'Karnataka (Local Express)' : 'National Standard',
      estimatedDeliveryDays: isLocalKarnataka ? '2-3 business days' : '4-6 business days',
      codAvailable: true,
      freeShippingThreshold: 750,
      standardShippingFee: 70,
    };
  }

  async updateShipment(data: {
    orderId: string;
    trackingNumber: string;
    courierPartner: string;
    status: ShipmentStatus;
    estimatedDeliveryDate?: Date;
    notes?: string;
  }) {
    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
    });
    if (!order) throw new NotFoundError('Order not found');

    const existing = await prisma.shipment.findFirst({
      where: { orderId: data.orderId },
    });

    const shipment = existing
      ? await prisma.shipment.update({
          where: { id: existing.id },
          data: {
            trackingNumber: data.trackingNumber,
            courierPartner: data.courierPartner,
            status: data.status,
            estimatedDeliveryDate: data.estimatedDeliveryDate,
            notes: data.notes,
          },
        })
      : await prisma.shipment.create({
          data: {
            orderId: data.orderId,
            trackingNumber: data.trackingNumber,
            courierPartner: data.courierPartner,
            status: data.status,
            estimatedDeliveryDate: data.estimatedDeliveryDate,
            notes: data.notes,
          },
        });

    if (data.status === ShipmentStatus.IN_TRANSIT || data.status === ShipmentStatus.MANIFESTED) {
      await prisma.order.update({
        where: { id: data.orderId },
        data: { status: OrderStatus.SHIPPED },
      });
      await dispatchNotificationJob('SHIPMENT_UPDATE', { order, shipment });
    } else if (data.status === ShipmentStatus.DELIVERED) {
      await prisma.order.update({
        where: { id: data.orderId },
        data: { status: OrderStatus.DELIVERED },
      });
    }

    return shipment;
  }

  async getShipmentByOrder(orderIdOrNumber: string) {
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: orderIdOrNumber }, { orderNumber: orderIdOrNumber }],
      },
      include: { shipments: true },
    });

    if (!order) throw new NotFoundError('Order not found');
    return order.shipments[0] || null;
  }
}

export const shippingService = new ShippingService();
