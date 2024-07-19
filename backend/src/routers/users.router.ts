import { Router } from "express";
import {
  getAllUsers,
  getClients,
  getUser,
} from "../controllers/users.controller";
import { getAllHosts } from "../controllers/hosts.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { verifyOrganizer } from "../middlewares/verifyOrganizer";

const UsersRouter = Router();

UsersRouter.get("/", verifyToken, verifyAdmin, getAllUsers);
UsersRouter.get("/clients", verifyToken, verifyOrganizer, getClients);
UsersRouter.get("/hosts", getAllHosts);
UsersRouter.get("/:id", verifyToken, verifyAdmin, getUser);

export default UsersRouter;
