import { Prisma, PrismaClient } from "@prisma/client";
import { Product } from "../interfaces/product";
import { ProductServices } from "../interfaces/product_service";
import { Res } from "../interfaces/res";

export class ProductService implements ProductServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createProduct(product: Product): Promise<Res<null>> {
    try {
      if (product.quantity > product.stockLimit) {
        return {
          success: false,
          message: "Quantity cannot be greater than stock limit",
          data: null,
        };
      }
      await this.prisma.product.create({
        data: product,
      });
      return {
        success: true,
        message: "Product successfully created",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async createProducts(products: Product[]): Promise<Res<null>> {
    try {
      await this.prisma.product.createMany({
        data: products,
      });
      return {
        success: true,
        message: "Products successfully created",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async updateProduct(product: Product): Promise<Res<null>> {
    try {
      if (product.quantity > product.stockLimit) {
        return {
          success: false,
          message: "Quantity cannot be greater than stock limit",
          data: null,
        };
      }
      await this.prisma.product.update({
        where: {
          id: product.id,
        },
        data: product,
      });
      return {
        success: true,
        message: "Product successfully updated",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async deleteProduct(id: string): Promise<Res<null>> {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      if (!product) {
        return {
          success: false,
          message: "product does not exist",
          data: null,
        };
      }
      const orders = await this.prisma.order.findMany({
        where: {
          productId: id,
          isOrderCompleted: false,
        },
      });
      if (orders.length > 0) {
        return {
          success: false,
          message: "There are orders for this product that are not completed",
          data: null,
        };
      }
      await this.prisma.product.delete({
        where: {
          id: id,
        },
      });
      await this.prisma.deletedProduct.create({
        data: product,
      });
      return {
        success: true,
        message: "Product successfully deleted",
        data: null,
      };
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.message.includes("Record to update not found")) {
          return {
            success: false,
            message: "Product not found",
            data: null,
          };
        }
      }

      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getProduct(productId: string): Promise<Res<Product | null>> {
    try {
      const product: Product | null = await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      if (!product) {
        return {
          success: false,
          message: "Product not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "Product found",
        data: product,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getAllProducts(): Promise<Res<Product[] | null>> {
    try {
      const products: Product[] = await this.prisma.product.findMany();
      return {
        success: true,
        message: "Products found",
        data: products,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getProductsByType(type: string): Promise<Res<Product[] | null>> {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          type: type,
        },
      });
      return {
        success: true,
        message: "Products found",
        data: products,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getProductsByName(productName: string): Promise<Res<Product[] | null>> {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          name: {
            contains: productName,
          },
        },
      });
      return {
        success: true,
        message: "Products found",
        data: products,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getProductsBySize(size: string): Promise<Res<Product[] | null>> {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          size: size,
        },
      });
      return {
        success: true,
        message: "Products found",
        data: products,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getProductsByPrice(
    min: number,
    max: number
  ): Promise<Res<Product[] | null>> {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          price: {
            gte: min,
            lte: max,
          },
        },
      });
      return {
        success: true,
        message: "Products found",
        data: products,
      };
    } catch {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }
}
