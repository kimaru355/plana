import express, { NextFunction, Request, Response, json } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routers/auth.router";
import UserRouter from "./routers/user.router";
import CategoryRouter from "./routers/category.router";
import { verifyToken } from "./middlewares/verifyToken";
import { verifyAdmin } from "./middlewares/verifyAdmin";
import ManageEventRouter from "./routers/ManageEvent.router";
import { verifyOrganizer } from "./middlewares/verifyOrganizer";
import EventTicketRouter from "./routers/eventTicket.router";
import EventRouter from "./routers/event.router";
import TicketRouter from "./routers/ticket.router";
import UsersRouter from "./routers/users.router";
import AnalyticRouter from "./routers/analytic.router";

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
app.use("/manage-events", verifyToken, verifyOrganizer, ManageEventRouter);
app.use("/event-tickets", verifyToken, verifyOrganizer, EventTicketRouter);
app.use("/events", EventRouter);
app.use("/user", verifyToken, UserRouter);
app.use("/users", UsersRouter);
app.use("/categories", CategoryRouter);
app.use("/tickets", verifyToken, TicketRouter);
app.use("/analytics", verifyToken, AnalyticRouter);

app.use("**", (req: Request, res: Response) => {
  return res.status(200).json({
    success: false,
    message: "Route not found",
    data: null,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
