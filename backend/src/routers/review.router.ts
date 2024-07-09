import { Router } from "express";

import {
  createReview,
  getReviews,
  getReviewsByUserId,
  getReviewsByProductId,
  updateReview,
  deleteReview,
} from "../controllers/review.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const ReviewRouter = Router();

ReviewRouter.post("/create", verifyToken, createReview);
ReviewRouter.put("/update/:id", verifyToken, updateReview);
ReviewRouter.delete("/delete/:id", verifyToken, deleteReview);
ReviewRouter.get("/all", verifyToken, verifyAdmin, getReviews);
ReviewRouter.get("/user/:userId", verifyToken, verifyAdmin, getReviewsByUserId);
ReviewRouter.get("/product/:productId", getReviewsByProductId);

export default ReviewRouter;
