import { prisma } from '../../config/prisma.js';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../utils/errors.js';
import { generateOrderNumber } from '../../utils/orderNumber.js';
import { calculateOrderTotals } from '../../utils/calculation.js';
import { inventoryService } from '../inventory/inventory.service.js';
import { createRazorpayOrder } from '../../integrations/razorpay.integration.js';
import { dispatchNotificationJob } from '../../jobs/queue.js';
import { OrderStatus, PaymentMethod, PaymentStatus, Prisma } from '@prisma/client';
import { VALID_ORDER_TRANSITIONS } from '../../config/constants.js';

export class OrderService {
  async checkout(data: any, userId?: string) {
    const orderNumber = generateOrderNumber();

    // 1. Fetch products & variants from DB to guarantee price integrity
    const itemsWithDetails: any[] = [];
    for (const item of data.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId, deletedAt: null, isActive: true },
        include: { variants: true },
      });

      if (!product) {
        throw new BadRequestError(`Product ${item.productId} is unavailable.`);
      }

      let unitPrice = Number(product.discountedPrice || product.price);
      let variantName: string | null = null;
      let sku = product.sku;

      if (item.variantId) {
        const variant = product.variants.find(v => v.id === item.variantId);
        if (!variant || !variant.isActive) {
          throw new BadRequestError(`Variant for product '${product.name}' is unavailable.`);
        }
        unitPrice = Number(variant.price);
        variantName = variant.name;
        sku = variant.sku;
      }

      itemsWithDetails.push({
        productId: product.id,
        variantId: item.variantId || null,
        productName: product.name,
        variantName,
        sku,
        unitPrice,
        quantity: item.quantity,
        totalPrice: unitPrice * item.quantity,
        taxRate: Number(product.taxRate),
        productSnapshot: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          sku,
          variantName,
        },
      });
    }

    // 2. Validate coupon if provided
    let coupon: any = null;
    if (data.couponCode) {
      const code = data.couponCode.trim().toUpperCase();
      const now = new Date();
      coupon = await prisma.coupon.findFirst({
        where: {
          code,
          isActive: true,
          startsAt: { lte: now },
          expiresAt: { gte: now },
        },
      });
    }

    // 3. Compute final totals on the server
    const totals = calculateOrderTotals({
      items: itemsWithDetails.map(i => ({
        price: i.unitPrice,
        quantity: i.quantity,
        taxRate: i.taxRate,
      })),
      coupon: coupon
        ? {
            discountType: coupon.discountType,
            discountValue: Number(coupon.discountValue),
            maxDiscountAmount: coupon.maxDiscountAmount ? Number(coupon.maxDiscountAmount) : null,
            minOrderAmount: coupon.minOrderAmount ? Number(coupon.minOrderAmount) : null,
          }
        : null,
    });

    // 4. Create Order & OrderItems in database transaction
    const initialStatus =
      data.paymentMethod === PaymentMethod.COD ? OrderStatus.CONFIRMED : OrderStatus.AWAITING_PAYMENT;
    const initialPaymentStatus =
      data.paymentMethod === PaymentMethod.COD ? PaymentStatus.CREATED : PaymentStatus.CREATED;

    const order = await prisma.$transaction(async tx => {
      const createdOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          status: initialStatus,
          customerName: data.customerName,
          customerEmail: data.customerEmail.toLowerCase(),
          customerPhone: data.customerPhone,
          shippingAddress: data.shippingAddress,
          billingAddress: data.billingAddress || data.shippingAddress,
          subtotal: totals.subtotal,
          discountAmount: totals.discountAmount,
          couponCode: coupon ? coupon.code : null,
          shippingFee: totals.shippingFee,
          taxAmount: totals.taxAmount,
          totalAmount: totals.totalAmount,
          paymentMethod: data.paymentMethod,
          paymentStatus: initialPaymentStatus,
          notes: data.notes,
          items: {
            create: itemsWithDetails.map(i => ({
              productId: i.productId,
              variantId: i.variantId,
              productName: i.productName,
              variantName: i.variantName,
              sku: i.sku,
              unitPrice: i.unitPrice,
              quantity: i.quantity,
              totalPrice: i.totalPrice,
              productSnapshot: i.productSnapshot,
            })),
          },
          events: {
            create: {
              toStatus: initialStatus,
              actorType: 'CUSTOMER',
              actorId: userId,
              notes: `Order created via ${data.paymentMethod}`,
            },
          },
        },
        include: { items: true },
      });

      // Track coupon redemption if applied
      if (coupon) {
        await tx.couponRedemption.create({
          data: {
            couponId: coupon.id,
            userId,
            orderId: createdOrder.id,
            discountAmount: totals.discountAmount,
          },
        });
        await tx.coupon.update({
          where: { id: coupon.id },
          data: { timesUsed: { increment: 1 } },
        });
      }

      return createdOrder;
    });

    // 5. Atomically reserve inventory
    await inventoryService.reserveStock(
      data.items.map((i: any) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      })),
      order.id
    );

    // 6. Handle payment flow
    let razorpayOrder: any = null;

    if (data.paymentMethod === PaymentMethod.ONLINE) {
      razorpayOrder = await createRazorpayOrder({
        orderNumber: order.orderNumber,
        amount: Number(order.totalAmount),
        notes: { orderId: order.id },
      });

      // Save payment intent
      await prisma.payment.create({
        data: {
          orderId: order.id,
          gateway: 'RAZORPAY',
          gatewayOrderId: razorpayOrder.id,
          amount: order.totalAmount,
          currency: 'INR',
          status: PaymentStatus.CREATED,
        },
      });
    } else {
      // COD Order is confirmed right away
      await inventoryService.deductStock(order.id);
      await dispatchNotificationJob('ORDER_CONFIRMATION', { order });
    }

    return {
      order,
      razorpay: razorpayOrder
        ? {
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
          }
        : null,
    };
  }

  async getOrderById(idOrNumber: string, userId?: string) {
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: idOrNumber }, { orderNumber: idOrNumber }],
      },
      include: {
        items: {
          include: {
            product: {
              include: { images: { where: { isPrimary: true }, take: 1 } },
            },
          },
        },
        events: { orderBy: { createdAt: 'desc' } },
        payments: true,
        refunds: true,
        shipments: true,
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (userId && order.userId && order.userId !== userId) {
      throw new ForbiddenError('You can only view your own orders');
    }

    return order;
  }

  async getCustomerOrders(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: {
                include: { images: { where: { isPrimary: true }, take: 1 } },
              },
            },
          },
          shipments: true,
        },
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return { orders, total, page, limit };
  }

  async getAdminOrders(params: {
    page?: number;
    limit?: number;
    status?: OrderStatus;
    search?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 15;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {};

    if (params.status) {
      where.status = params.status;
    }

    if (params.search) {
      const q = params.search.trim();
      where.OR = [
        { orderNumber: { contains: q, mode: 'insensitive' } },
        { customerName: { contains: q, mode: 'insensitive' } },
        { customerEmail: { contains: q, mode: 'insensitive' } },
        { customerPhone: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (params.startDate || params.endDate) {
      where.createdAt = {};
      if (params.startDate) where.createdAt.gte = new Date(params.startDate);
      if (params.endDate) where.createdAt.lte = new Date(params.endDate);
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
          payments: true,
          shipments: true,
        },
      }),
      prisma.order.count({ where }),
    ]);

    return { orders, total, page, limit };
  }

  async updateOrderStatus(orderId: string, newStatus: OrderStatus, actorId?: string, notes?: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) throw new NotFoundError('Order not found');

    const allowed = VALID_ORDER_TRANSITIONS[order.status];
    if (allowed && !allowed.includes(newStatus)) {
      throw new BadRequestError(
        `Invalid status transition from '${order.status}' to '${newStatus}'. Permitted: [${allowed.join(', ')}]`
      );
    }

    const updated = await prisma.$transaction(async tx => {
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: newStatus,
          ...(newStatus === OrderStatus.CANCELLED ? { cancelledAt: new Date(), cancellationReason: notes } : {}),
        },
        include: { items: true, shipments: true },
      });

      await tx.orderEvent.create({
        data: {
          orderId,
          fromStatus: order.status,
          toStatus: newStatus,
          actorType: 'ADMIN',
          actorId,
          notes: notes || `Status updated to ${newStatus}`,
        },
      });

      return updatedOrder;
    });

    // Handle inventory state transitions
    if (newStatus === OrderStatus.CANCELLED) {
      if (order.status === OrderStatus.CONFIRMED || order.status === OrderStatus.PROCESSING) {
        // Was already deducted, restock it
        await inventoryService.adjustStock(
          {
            productId: order.items[0]?.productId,
            quantityChange: order.items.reduce((acc, i) => acc + i.quantity, 0),
            reason: 'CANCELLATION_RESTOCK' as any,
            notes: `Restocked on order cancellation #${order.orderNumber}`,
          },
          actorId
        );
      } else {
        // Was reserved, release reservation
        await inventoryService.releaseReservation(order.id);
      }
    } else if (newStatus === OrderStatus.SHIPPED) {
      const shipment = await prisma.shipment.findFirst({ where: { orderId } });
      await dispatchNotificationJob('SHIPMENT_UPDATE', { order: updated, shipment });
    }

    return updated;
  }

  async cancelOrder(orderId: string, reason: string, userId?: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) throw new NotFoundError('Order not found');

    if (userId && order.userId && order.userId !== userId) {
      throw new ForbiddenError('You can only cancel your own order');
    }

    const cancellableStatuses: OrderStatus[] = [
      OrderStatus.PENDING,
      OrderStatus.AWAITING_PAYMENT,
      OrderStatus.CONFIRMED,
    ];

    if (!cancellableStatuses.includes(order.status)) {
      throw new BadRequestError(
        `Order cannot be cancelled in '${order.status}' status. Please contact support.`
      );
    }

    return this.updateOrderStatus(orderId, OrderStatus.CANCELLED, userId, reason);
  }
}

export const orderService = new OrderService();
