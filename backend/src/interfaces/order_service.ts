import { Order, Orders } from "./order";
import { Res } from "./res";

export interface OrderServices {
  createOrder(userId: string): Promise<Res<null>>;
  updateOrder(userId: string, id: string): Promise<Res<null>>;
  getAllOrders(): Promise<Res<Orders[] | null>>;
  getCompletedOrders(): Promise<Res<Orders[] | null>>;
  getIncompleteOrders(): Promise<Res<Orders[] | null>>;
  getOrdersByProductId(productId: string): Promise<Res<Orders[] | null>>;
  getOrdersByUserId(userId: string): Promise<Res<Orders[] | null>>;
}
