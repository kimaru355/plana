import { Router } from "express";
import {
  createTicket,
  getOrganizerTickets,
  getTicket,
  getTickets,
  getTicketsByEventId,
  getTicketsByUserId,
  updateTicket,
} from "../controllers/ticket.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { verifyOrganizer } from "../middlewares/verifyOrganizer";
import { verifyToken } from "../middlewares/verifyToken";

const TicketRouter = Router();

TicketRouter.post("/create", createTicket);
TicketRouter.put("/update", updateTicket);
TicketRouter.get("/all", verifyAdmin, getTickets);
TicketRouter.get("/event/:eventId", verifyAdmin, getTicketsByEventId);
TicketRouter.get(
  "/organizer",
  verifyToken,
  verifyOrganizer,
  getOrganizerTickets
);
TicketRouter.get("/user", getTicketsByUserId);
TicketRouter.get("/:id", getTicket);

export default TicketRouter;
