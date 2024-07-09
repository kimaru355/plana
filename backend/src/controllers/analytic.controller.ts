import { Request, Response } from "express";
import { AnalyticService } from "../services/analytic.service";

export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const analyticService: AnalyticService = new AnalyticService();
  const response = await analyticService.getAnalytics();
  if (response.success && response.data) {
    response.data.topTenSellingProducts.forEach((product) => {
      if (typeof product.images === "string") {
        product.images = product.images.split(":::::");
      }
    });
    response.data.tenLeastStockProducts.forEach((product) => {
      if (typeof product.images === "string") {
        product.images = product.images.split(":::::");
      }
    });
  }
  return res.status(200).json(response);
};
