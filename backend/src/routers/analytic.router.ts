import { Router } from "express";
import {
  getAdminAnalytics,
  getOrganizerAnalytics,
} from "../controllers/analytic.controller";
import { verifyOrganizer } from "../middlewares/verifyOrganizer";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const AnalyticRouter = Router();

AnalyticRouter.get("/organizer", verifyOrganizer, getOrganizerAnalytics);
AnalyticRouter.get("/admin", verifyAdmin, getAdminAnalytics);

export default AnalyticRouter;
