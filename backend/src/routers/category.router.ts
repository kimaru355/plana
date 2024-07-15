import { Router } from "express";
import {
  createEventCategory,
  deleteEventCategory,
  getAllEventCategories,
  getEventCategoriesByAdminId,
  getEventCategory,
  updateEventCategory,
} from "../controllers/category.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const CategoryRouter = Router();

CategoryRouter.post("/create", verifyToken, verifyAdmin, createEventCategory);
CategoryRouter.put(
  "/update/:id",
  verifyToken,
  verifyAdmin,
  updateEventCategory
);
CategoryRouter.delete(
  "/delete/:id",
  verifyToken,
  verifyAdmin,
  deleteEventCategory
);
CategoryRouter.get("/all", getAllEventCategories);
CategoryRouter.get(
  "/admin",
  verifyToken,
  verifyAdmin,
  getEventCategoriesByAdminId
);
CategoryRouter.get("/:id", getEventCategory);

export default CategoryRouter;
