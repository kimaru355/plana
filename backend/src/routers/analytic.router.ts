import { Router } from "express";
import { getAnalytics } from "../controllers/analytic.controller";

const AnalyticRouter = Router();

AnalyticRouter.get("/", getAnalytics);

export default AnalyticRouter;
