import { PrismaClient } from "@prisma/client";
import { Analytic } from "../interfaces/analytic";
import { AnalyticServices } from "../interfaces/analytic_service";
import { Res } from "../interfaces/res";

export class AnalyticService implements AnalyticServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async getAnalytics(): Promise<Res<Analytic | null>> {
    try {
      const totalUsers = await this.prisma.user.count();
      const totalOrders = await this.prisma.order.count();
      const totalCompleteOrders = await this.prisma.order.count({
        where: {
          isOrderCompleted: true,
        },
      });
      const totalIncompleteOrders = await this.prisma.order.count({
        where: {
          isOrderCompleted: false,
        },
      });
      const totalProducts = await this.prisma.product.count();
      const totalProductsSold = await this.prisma.order.aggregate({
        _sum: {
          productNumber: true,
        },
      });
      const orders = await this.prisma.order.findMany({
        include: {
          product: true,
        },
      });
      const totalRevenue = orders.reduce((acc, order) => {
        return acc + order.productNumber * order.product.price;
      }, 0);
      const allProducts = await this.prisma.product.findMany();
      const totalCategories: string[] = [];
      allProducts.map((product) => {
        if (!totalCategories.includes(product.type)) {
          totalCategories.push(product.type);
        }
      });
      const topTenSellingProductsOrders = await this.prisma.order.groupBy({
        by: ["productId"],
        _sum: {
          productNumber: true,
        },
        orderBy: {
          _sum: {
            productNumber: "desc",
          },
        },
        take: 10,
      });
      const productIds = topTenSellingProductsOrders.map(
        (product) => product.productId
      );
      const topTenSellingProducts = await this.prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });
      const tenLeastStockProducts = await this.prisma.product.findMany({
        orderBy: {
          quantity: "asc",
        },
        take: 10,
      });
      const analytic: Analytic = {
        totalUsers,
        totalOrders,
        totalProducts,
        totalCategories: totalCategories.length,
        totalRevenue,
        totalProductsSold: totalProductsSold._sum.productNumber || 0,
        totalCompleteOrders,
        totalIncompleteOrders,
        tenLeastStockProducts,
        topTenSellingProducts,
      };
      return {
        success: true,
        message: "Analytics retrieved successfully",
        data: analytic,
      };
    } catch {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }
}
