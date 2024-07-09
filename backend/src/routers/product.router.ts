import { Router } from "express";
import {
  createProduct,
  createProducts,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductsByName,
  getProductsByPrice,
  getProductsBySize,
  getProductsByType,
  updateProduct,
} from "../controllers/product.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { verifyToken } from "../middlewares/verifyToken";

const ProductRouter = Router();

ProductRouter.post("/create", verifyToken, verifyAdmin, createProduct);
ProductRouter.post("/create-many", verifyToken, verifyAdmin, createProducts);
ProductRouter.put("/update", verifyToken, verifyAdmin, updateProduct);
ProductRouter.delete("/delete/:id", verifyToken, verifyAdmin, deleteProduct);
ProductRouter.get("/all", getAllProducts);
ProductRouter.get("/name/:productName", getProductsByName);
ProductRouter.get("/type/:productType", getProductsByType);
ProductRouter.get("/size/:productSize", getProductsBySize);
ProductRouter.post("/price", getProductsByPrice);
ProductRouter.get("/:id", getProduct);

export default ProductRouter;
