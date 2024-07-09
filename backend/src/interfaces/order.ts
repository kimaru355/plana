import { UserDetails } from "./auth";
import { Product, ProductImagesArray } from "./event";

export interface Order {
  id: string;
  productId: string;
  userId: string;
  productNumber: number;
  isOrderCompleted?: boolean;
  createdAt?: Date;
  updateAt?: Date;
}

export interface Orders {
  id: string;
  product: Product | ProductImagesArray;
  user: UserDetails;
  productNumber: number;
  isOderCompleted: boolean;
  createdAt: Date;
  updateAt: Date;
}
