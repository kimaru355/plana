import { Router } from "express";
import {
  getAllOrders,
  getOrdersByProductId,
  getOrdersByUserId,
  getCompletedOrders,
  getIncompleteOrders,
  getUserOrders,
  updateOrder,
} from "../controllers/order.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const OrderRouter = Router();

OrderRouter.put("/update", verifyAdmin, updateOrder);
OrderRouter.get("/complete", verifyAdmin, getCompletedOrders);
OrderRouter.get("/incomplete", verifyAdmin, getIncompleteOrders);
OrderRouter.get("/all", verifyAdmin, getAllOrders);
OrderRouter.get("/product/:productId", verifyAdmin, getOrdersByProductId);
OrderRouter.get("/user", getUserOrders);
OrderRouter.get("/users/:userId", verifyAdmin, getOrdersByUserId);

export default OrderRouter;
