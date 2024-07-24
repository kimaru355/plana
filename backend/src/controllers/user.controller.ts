import { Request, Response } from "express";
import { getIdFromToken } from "../helpers/get_id_from_token";
import { UsersService } from "../services/users.service";

export const getUserDetails = async (req: Request, res: Response) => {
  const usersService = new UsersService();
  const role = req.params.role;
  const id = getIdFromToken(req);

  if (!id || !role || !["user", "organizer", "admin"].includes(role)) {
    return res.status(200).json({ success: false, message: "Unauthorized" });
  }
  if (role === "user") {
    const user = await usersService.getUser(id);
    return res.status(200).json(user);
  } else if (role === "organizer") {
    const organizers = await usersService.getOrganizer(id);
    return res.status(200).json(organizers);
  } else {
    const admins = await usersService.getAdmin(id);
    return res.status(200).json(admins);
  }
};
