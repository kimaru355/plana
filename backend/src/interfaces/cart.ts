import { Product, ProductImagesArray } from "./product";

export interface CartItem {
  id: string;
  productId: string;
  userId: string;
  productNumber: number;
  createdAt?: Date;
  updateAt?: Date;
}

export interface Cart {
  id: string;
  product: ProductImagesArray | Product;
  productNumber: number;
}
