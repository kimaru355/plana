import { Product, ProductImagesArray } from "./event";

export interface Analytic {
  totalUsers: number;
  totalOrders: number;
  totalCompleteOrders: number;
  totalIncompleteOrders: number;
  totalProducts: number;
  totalProductsSold: number;
  totalRevenue: number;
  topTenSellingProducts: Product[] | ProductImagesArray[];
  tenLeastStockProducts: Product[] | ProductImagesArray[];
  totalCategories: number;
}
