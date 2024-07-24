import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get("/details/:role", getUserDetails);

export default UserRouter;
