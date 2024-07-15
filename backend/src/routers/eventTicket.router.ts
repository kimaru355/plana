import { Router } from "express";
import {
  createEventTicket,
  createEventTickets,
  deleteEventTicket,
  getAllEventTickets,
  getEventTicket,
  getEventTicketsByEventId,
  updateEventTicket,
} from "../controllers/eventTicket.controller";

const EventTicketRouter = Router();

EventTicketRouter.post("/create", createEventTicket);
EventTicketRouter.post("/create-many", createEventTickets);
EventTicketRouter.put("/update", updateEventTicket);
EventTicketRouter.delete("/delete/:id", deleteEventTicket);
EventTicketRouter.get("/all", getAllEventTickets);
EventTicketRouter.get("/event/:eventId", getEventTicketsByEventId);
EventTicketRouter.get("/:id", getEventTicket);

export default EventTicketRouter;
