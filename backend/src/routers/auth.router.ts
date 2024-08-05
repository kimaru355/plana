import { Router } from "express";
import {
  activateAdmin,
  activateOrganizer,
  activateUser,
  createDefaultAdmin,
  deactivateAdmin,
  deactivateOrganizer,
  deactivateUser,
  login,
  register,
  registerAdmin,
  updateDetails,
  updatePassword,
  verifyOrganizer,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const AuthRouter = Router();

AuthRouter.post("/create-default-admin", createDefaultAdmin);
AuthRouter.post("/register/admin", verifyToken, verifyAdmin, registerAdmin);
AuthRouter.post("/register/:role", register);
AuthRouter.post("/login/:role", login);
AuthRouter.put("/update_details/:role", verifyToken, updateDetails);
AuthRouter.put("/update_password/:role", verifyToken, updatePassword);
AuthRouter.put("/verify/:organizerId", verifyAdmin, verifyOrganizer);
AuthRouter.put("/activate/user/:userId", verifyAdmin, activateUser);
AuthRouter.put("/deactivate/user/:userId", verifyAdmin, deactivateUser);
AuthRouter.put(
  "/activate/organizer/:organizerId",
  verifyAdmin,
  activateOrganizer
);
AuthRouter.put(
  "/deactivate/organizer/:organizerId",
  verifyAdmin,
  deactivateOrganizer
);
AuthRouter.put("/activate/admin/:adminId", verifyAdmin, activateAdmin);
AuthRouter.put("/deactivate/admin/:adminId", verifyAdmin, deactivateAdmin);

export default AuthRouter;
