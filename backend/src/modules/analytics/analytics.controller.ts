import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma.js';
import { sendSuccess } from '../../utils/response.js';
import { OrderStatus } from '@prisma/client';

export class AnalyticsController {
  async getSalesReport(req: Request, res: Response, next: NextFunction) {
    try {
      const days = req.query.days ? Number(req.query.days) : 30;
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - days);

      // Orders by status
      const statusCounts = await prisma.order.groupBy({
        by: ['status'],
        where: { createdAt: { gte: sinceDate } },
        _count: { id: true },
      });

      // Revenue by Category
      const items = await prisma.orderItem.findMany({
        where: {
          order: {
            createdAt: { gte: sinceDate },
            status: { not: OrderStatus.CANCELLED },
          },
        },
        include: {
          product: { include: { category: true } },
        },
      });

      const categoryRevenue: Record<string, number> = {};
      for (const item of items) {
        const catName = item.product.category?.name || 'Uncategorized';
        categoryRevenue[catName] = (categoryRevenue[catName] || 0) + Number(item.totalPrice);
      }

      // Daily trend breakdown (last N days)
      const dailyOrders = await prisma.order.findMany({
        where: {
          createdAt: { gte: sinceDate },
          status: { not: OrderStatus.CANCELLED },
        },
        select: {
          createdAt: true,
          totalAmount: true,
        },
      });

      const dailyTrends: Record<string, { date: string; revenue: number; ordersCount: number }> = {};
      for (const o of dailyOrders) {
        const dayStr = o.createdAt.toISOString().split('T')[0];
        if (!dailyTrends[dayStr]) {
          dailyTrends[dayStr] = { date: dayStr, revenue: 0, ordersCount: 0 };
        }
        dailyTrends[dayStr].revenue += Number(o.totalAmount);
        dailyTrends[dayStr].ordersCount += 1;
      }

      return sendSuccess(res, {
        periodDays: days,
        statusBreakdown: statusCounts.map(s => ({ status: s.status, count: s._count.id })),
        categoryRevenue: Object.entries(categoryRevenue).map(([category, revenue]) => ({
          category,
          revenue: Number(revenue.toFixed(2)),
        })),
        dailyTrends: Object.values(dailyTrends).sort((a, b) => a.date.localeCompare(b.date)),
      });
    } catch (error) {
      next(error);
    }
  }
}

export const analyticsController = new AnalyticsController();
