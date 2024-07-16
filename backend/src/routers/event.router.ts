import { Router } from "express";
import {
  getAllEvents,
  getEvent,
  getEventsByName,
  getEventsByTicketPrice,
  getEventsByTimeRange,
  getEventsByCountry,
  getEventsByCategory,
} from "../controllers/event.controller";

const EventRouter = Router();

EventRouter.get("/all", getAllEvents);
EventRouter.get("/name/:EventName", getEventsByName);
EventRouter.get("/category/:eventCategory", getEventsByCategory);
EventRouter.get("/country/:eventCountry", getEventsByCountry);
EventRouter.post("/price", getEventsByTicketPrice);
EventRouter.post("/time", getEventsByTimeRange);
EventRouter.get("/:id", getEvent);

export default EventRouter;
