import { Router } from "express";
import {
  login,
  register,
  updateDetails,
  updatePassword,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const AuthRouter = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.put("/update_details", verifyToken, updateDetails);
AuthRouter.put("/update_password", verifyToken, updatePassword);

export default AuthRouter;
