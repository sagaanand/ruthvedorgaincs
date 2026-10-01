import { prisma } from '../../config/prisma.js';
import { OrderStatus, PaymentStatus, UserRole } from '@prisma/client';

export class AdminService {
  async getDashboardMetrics(startDate?: Date, endDate?: Date) {
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;

    const whereCreated = startDate || endDate ? { createdAt: dateFilter } : undefined;

    // 1. Order Status Counts
    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
      cancelledOrders,
      totalCustomers,
      newCustomers,
    ] = await Promise.all([
      prisma.order.count({ where: whereCreated }),
      prisma.order.count({ where: { ...whereCreated, status: OrderStatus.PENDING } }),
      prisma.order.count({ where: { ...whereCreated, status: OrderStatus.CONFIRMED } }),
      prisma.order.count({ where: { ...whereCreated, status: OrderStatus.DELIVERED } }),
      prisma.order.count({ where: { ...whereCreated, status: OrderStatus.CANCELLED } }),
      prisma.user.count({ where: { role: UserRole.CUSTOMER } }),
      prisma.user.count({ where: { role: UserRole.CUSTOMER, ...whereCreated } }),
    ]);

    // 2. Revenue (Net revenue from captured payments or confirmed/delivered orders)
    const paidOrders = await prisma.order.findMany({
      where: {
        ...whereCreated,
        status: { in: [OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.PACKED, OrderStatus.SHIPPED, OrderStatus.DELIVERED] },
        paymentStatus: { in: [PaymentStatus.CAPTURED, PaymentStatus.CREATED] },
      },
      select: {
        totalAmount: true,
        subtotal: true,
        discountAmount: true,
        shippingFee: true,
        taxAmount: true,
      },
    });

    const totalRevenue = paidOrders.reduce((acc, o) => acc + Number(o.totalAmount), 0);
    const grossSales = paidOrders.reduce((acc, o) => acc + Number(o.subtotal), 0);
    const totalDiscounts = paidOrders.reduce((acc, o) => acc + Number(o.discountAmount), 0);
    const averageOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

    // 3. Low stock products
    const lowStockItems = await prisma.inventory.findMany({
      where: { currentStock: { lte: 10 } },
      include: {
        product: { select: { id: true, name: true, sku: true } },
        variant: { select: { id: true, name: true, sku: true } },
      },
      take: 8,
    });

    // 4. Top selling products
    const topSellingItems = await prisma.orderItem.groupBy({
      by: ['productId', 'productName'],
      _sum: { quantity: true, totalPrice: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    // 5. Recent 5 orders
    const recentOrders = await prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        customerEmail: true,
        totalAmount: true,
        status: true,
        paymentStatus: true,
        createdAt: true,
      },
    });

    return {
      revenue: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        grossSales: Number(grossSales.toFixed(2)),
        totalDiscounts: Number(totalDiscounts.toFixed(2)),
        averageOrderValue: Number(averageOrderValue.toFixed(2)),
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        confirmed: confirmedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
      },
      customers: {
        total: totalCustomers,
        newInPeriod: newCustomers,
      },
      lowStockAlertsCount: lowStockItems.length,
      lowStockItems,
      topSellingItems: topSellingItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        totalQuantitySold: item._sum.quantity || 0,
        totalRevenue: Number(item._sum.totalPrice || 0),
      })),
      recentOrders,
    };
  }

  async getCustomers(page = 1, limit = 15, search?: string) {
    const skip = (page - 1) * limit;

    const where: any = { role: UserRole.CUSTOMER };
    if (search) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [customers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          isActive: true,
          createdAt: true,
          _count: { select: { orders: true } },
          orders: {
            where: { status: { not: OrderStatus.CANCELLED } },
            select: { totalAmount: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    const formatted = customers.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      isActive: c.isActive,
      createdAt: c.createdAt,
      totalOrders: c._count.orders,
      lifetimeSpent: c.orders.reduce((acc, o) => acc + Number(o.totalAmount), 0),
    }));

    return { customers: formatted, total, page, limit };
  }

  async toggleCustomerStatus(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    return prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
      select: { id: true, name: true, email: true, isActive: true },
    });
  }

  async getAuditLogs(page = 1, limit = 25) {
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.auditLog.count(),
    ]);

    return { logs, total, page, limit };
  }
}

export const adminService = new AdminService();
