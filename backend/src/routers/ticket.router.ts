import { Router } from "express";
import {
  createTicket,
  getTicket,
  getTickets,
  getTicketsByEventId,
  getTicketsByUserId,
  updateTicket,
} from "../controllers/ticket.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const TicketRouter = Router();

TicketRouter.put("/create", createTicket);
TicketRouter.put("/update", updateTicket);
TicketRouter.get("/all", verifyAdmin, getTickets);
TicketRouter.get("/event/:eventId", verifyAdmin, getTicketsByEventId);
TicketRouter.get("/user", getTicketsByUserId);
TicketRouter.get("/:id", getTicket);

export default TicketRouter;
