import { Router } from "express";
import {
  createEvent,
  createEvents,
  deleteEvent,
  getAllEvents,
  getEvent,
  getEventsByName,
  getEventsByTicketPrice,
  getEventsByTimeRange,
  getEventsByCountry,
  getEventsByCategory,
  updateEvent,
} from "../controllers/event.controller";

const EventRouter = Router();

EventRouter.post("/create", createEvent);
EventRouter.post("/create-many", createEvents);
EventRouter.put("/update", updateEvent);
EventRouter.delete("/delete/:id", deleteEvent);
EventRouter.get("/all", getAllEvents);
EventRouter.get("/name/:EventName", getEventsByName);
EventRouter.get("/category/:eventCategory", getEventsByCategory);
EventRouter.get("/country/:eventCountry", getEventsByCountry);
EventRouter.post("/price", getEventsByTicketPrice);
EventRouter.post("/time", getEventsByTimeRange);
EventRouter.get("/:id", getEvent);

export default EventRouter;
