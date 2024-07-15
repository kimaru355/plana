import express, { NextFunction, Request, Response, json } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routers/auth.router";
// import OrderRouter from "./routers/order.router";
// import ReviewRouter from "./routers/review.router";
// import ProductRouter from "./routers/product.router";
// import FavoriteRouter from "./routers/favorite.router";
// import UsersRouter from "./routers/users.router";
import UserRouter from "./routers/user.router";
// import CartRouter from "./routers/cart.router";
// import AnalyticRouter from "./routers/analytic.router";
// import { createOrder } from "./controllers/order.controller";
import CategoryRouter from "./routers/category.router";
import { verifyToken } from "./middlewares/verifyToken";
import { verifyAdmin } from "./middlewares/verifyAdmin";
import EventRouter from "./routers/event.router";
import { verifyOrganizer } from "./middlewares/verifyOrganizer";

dotenv.config();
const app = express();

const allowedOrigins = ["http://localhost:4200", "http://localhost:61410"];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(json());
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
  next();
});

app.use("/auth", AuthRouter);
// app.post("/orders/create/:token", createOrder);
// app.use("/orders", verifyToken, OrderRouter);
// app.use("/cart", verifyToken, CartRouter);
// app.use("/reviews", ReviewRouter);
app.use("/manage-events", verifyToken, verifyOrganizer, EventRouter);
// app.use("/favorites", verifyToken, FavoriteRouter);
// app.use("/users", verifyToken, verifyAdmin, UsersRouter);
app.use("/user", verifyToken, UserRouter);
// app.use("/analytics", verifyToken, verifyAdmin, AnalyticRouter);
app.use("/categories", CategoryRouter);

app.use("**", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
