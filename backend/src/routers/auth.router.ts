import { Router } from "express";
import {
  login,
  register,
  updateDetails,
  updatePassword,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const AuthRouter = Router();

AuthRouter.post("/register/:role", register);
AuthRouter.post("/login/:role", login);
AuthRouter.put("/update_details/:role", verifyToken, updateDetails);
AuthRouter.put("/update_password/:role", verifyToken, updatePassword);

export default AuthRouter;
