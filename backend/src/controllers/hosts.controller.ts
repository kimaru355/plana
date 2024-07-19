import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { Res } from "../interfaces/res";
import { User } from "../interfaces/user";

export const getAllHosts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const usersService = new UsersService();
  const response: Res<User[] | null> = await usersService.getOrganizers();
  return res.status(200).json(response);
};
