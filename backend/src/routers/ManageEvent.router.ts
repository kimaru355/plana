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
} from "../controllers/manageEvent.controller";

const ManageEventRouter = Router();

ManageEventRouter.post("/create", createEvent);
ManageEventRouter.post("/create-many", createEvents);
ManageEventRouter.put("/update", updateEvent);
ManageEventRouter.delete("/delete/:id", deleteEvent);
ManageEventRouter.get("/all", getAllEvents);
ManageEventRouter.get("/name/:EventName", getEventsByName);
ManageEventRouter.get("/category/:eventCategory", getEventsByCategory);
ManageEventRouter.get("/country/:eventCountry", getEventsByCountry);
ManageEventRouter.post("/price", getEventsByTicketPrice);
ManageEventRouter.post("/time", getEventsByTimeRange);
ManageEventRouter.get("/:id", getEvent);

export default ManageEventRouter;
