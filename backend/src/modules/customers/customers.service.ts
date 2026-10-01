import { prisma } from '../../config/prisma.js';
import { UserRole, OrderStatus } from '@prisma/client';
import { NotFoundError } from '../../utils/errors.js';

export class CustomersService {
  async getCustomers(page = 1, limit = 20, search?: string, sortBy: 'createdAt' | 'name' | 'email' = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
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

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          isActive: true,
          isEmailVerified: true,
          isPhoneVerified: true,
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

    const customers = users.map((u) => {
      const lifetimeSpent = u.orders.reduce((acc, o) => acc + Number(o.totalAmount), 0);
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        isActive: u.isActive,
        isEmailVerified: u.isEmailVerified,
        isPhoneVerified: u.isPhoneVerified,
        createdAt: u.createdAt,
        totalOrders: u._count.orders,
        lifetimeSpent: Number(lifetimeSpent.toFixed(2)),
      };
    });

    return {
      customers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCustomerById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        addresses: {
          orderBy: { isDefault: 'desc' },
        },
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 20,
          select: {
            id: true,
            orderNumber: true,
            totalAmount: true,
            status: true,
            paymentStatus: true,
            createdAt: true,
          },
        },
        _count: {
          select: { orders: true, reviews: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('Customer not found');
    }

    const totalSpent = await prisma.order.aggregate({
      where: {
        userId: id,
        status: { in: [OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.DELIVERED] },
      },
      _sum: { totalAmount: true },
    });

    return {
      customer: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        createdAt: user.createdAt,
        addresses: user.addresses,
        recentOrders: user.orders,
        metrics: {
          totalOrders: user._count.orders,
          totalReviews: user._count.reviews,
          lifetimeSpent: Number(totalSpent._sum.totalAmount || 0),
        },
      },
    };
  }

  async updateCustomerStatus(id: string, isActive: boolean) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError('Customer not found');

    return prisma.user.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
      },
    });
  }

  async exportCustomers() {
    const users = await prisma.user.findMany({
      where: { role: UserRole.CUSTOMER },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
        createdAt: true,
        _count: { select: { orders: true } },
      },
    });

    return users.map((u) => ({
      ID: u.id,
      Name: u.name,
      Email: u.email,
      Phone: u.phone || 'N/A',
      Status: u.isActive ? 'Active' : 'Inactive',
      JoinedAt: u.createdAt.toISOString(),
      TotalOrders: u._count.orders,
    }));
  }
}

export const customersService = new CustomersService();
