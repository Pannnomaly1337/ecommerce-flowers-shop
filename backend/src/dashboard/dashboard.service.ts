import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getTotalRevenue() {
    const result = await this.prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    return result._sum.total || 0;
  }

  async getSalesPerDay() {
    const orders = await this.prisma.order.findMany({
      select: {
        total: true,
        createdAt: true,
      },
    });

    const grouped = {};

    for (const order of orders) {
      const date = order.createdAt.toISOString().split('T')[0];

      if (!grouped[date]) {
        grouped[date] = 0;
      }

      grouped[date] += order.total;
    }

    return Object.entries(grouped).map(([date, total]) => ({
      date,
      total,
    }));
  }

  async getBestSelling() {
    const items = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    const products = await Promise.all(
      items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });

        return {
          productId: item.productId,
          name: product?.name,
          totalSold: item._sum.quantity,
        };
      }),
    );

    return products;
  }

  async getLowStock() {
    return this.prisma.product.findMany({
      where: {
        stock: {
          lte: 5,
        },
      },
      select: {
        id: true,
        name: true,
        stock: true,
      },
    });
  }

  async getDashboard() {
    const [totalRevenue, salesPerDay, bestSelling, lowStock] =
      await Promise.all([
        this.getTotalRevenue(),
        this.getSalesPerDay(),
        this.getBestSelling(),
        this.getLowStock(),
      ]);

    return {
      totalRevenue,
      salesPerDay,
      bestSelling,
      lowStock,
    };
  }
}
