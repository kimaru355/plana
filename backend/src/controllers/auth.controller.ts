import { Request, Response } from "express";
import { v4 } from "uuid";
import { Res } from "../interfaces/res";
import { AuthService } from "../services/auth.service";
import {
  UserDetails,
  UserLogin,
  UserPasswords,
  UserRegister,
} from "../interfaces/auth";
import { getIdFromToken } from "../helpers/get_id_from_token";
import {
  sendApproveOrganizerEmail,
  sendWelcomeApprovedOrganizerEmail,
  sendWelcomeNewOrganizerEmail,
  sendWelcomeNewUsersEmail,
} from "../background-services/mailer";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role: "user" | "organizer" = req.params.role as "user" | "organizer";
  const user_register: UserRegister = req.body;
  if (
    !["user", "organizer"].includes(role) ||
    !user_register.email ||
    !user_register.password ||
    !user_register.name ||
    !user_register.phoneNumber ||
    !user_register.country ||
    Object.keys(user_register).length !== 5
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  user_register.id = v4();

  const auth = new AuthService();
  const response: Res<{ role: "user" | "organizer" | "admin" } | null> =
    await auth.register(user_register, role);
  if (response.success && role === "user") {
    sendWelcomeNewUsersEmail(
      user_register.email,
      user_register.name.split(" ")[0]
    );
    return res.status(201).json(response);
  } else if (response.success && role === "organizer") {
    sendWelcomeNewOrganizerEmail(
      user_register.email,
      user_register.name.split(" ")[0]
    );
    sendApproveOrganizerEmail("alazemibedour@gmail.com", user_register);
    return res.status(201).json(response);
  }
  return res.status(200).json(response);
};

export const createDefaultAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user_register: UserRegister = {
    id: v4(),
    email: process.env.ADMIN_EMAIL as string,
    name: "Emmanuel Kimaru",
    phoneNumber: "1234567876543",
    country: "Kenya",
    password: process.env.ADMIN_PASSWORD as string,
  };
  const role = "admin";
  console.log(user_register);

  if (
    !user_register.id ||
    !user_register.email ||
    !user_register.password ||
    !user_register.name ||
    !user_register.phoneNumber ||
    !user_register.country ||
    Object.keys(user_register).length !== 6
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }

  const auth = new AuthService();
  const response: Res<{ role: "user" | "organizer" | "admin" } | null> =
    await auth.register(user_register, role);
  return res.status(200).json(response);
};

export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user_register: UserRegister = req.body;
  user_register.password = user_register.email.split("@")[0];
  if (
    !user_register.email ||
    !user_register.password ||
    !user_register.name ||
    !user_register.phoneNumber ||
    !user_register.country ||
    Object.keys(user_register).length !== 5
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  user_register.id = v4();
  const auth = new AuthService();
  const response: Res<{ role: "user" | "organizer" | "admin" } | null> =
    await auth.register(user_register, "admin");
  if (response.success) {
    return res.status(201).json(response);
  }
  return res.status(200).json(response);
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const role: "user" | "organizer" | "admin" = req.params.role as
    | "user"
    | "organizer"
    | "admin";
  const user_login: UserLogin = req.body;
  if (
    !user_login.email ||
    !user_login.password ||
    !["user", "organizer", "admin"].includes(role)
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const auth = new AuthService();
  const response: Res<{ role: "user" | "organizer" | "admin" } | null> =
    await auth.login(user_login, role);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message === "An error occurred") {
    return res.status(200).json(response);
  } else {
    return res.status(200).json(response);
  }
};

export const updateDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = getIdFromToken(req);
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid or expired token",
      data: null,
    });
  }
  const role: "user" | "organizer" | "admin" = req.params.role as
    | "user"
    | "organizer"
    | "admin";
  const user_details: UserDetails = req.body;
  user_details.id = id;
  if (
    !user_details.id ||
    !user_details.email ||
    !user_details.name ||
    !user_details.phoneNumber ||
    !Object.keys(user_details).includes("imageUrl") ||
    !user_details.country ||
    Object.keys(user_details).length !== 6 ||
    !["user", "organizer", "admin"].includes(role)
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  user_details.id = id;

  const auth = new AuthService();
  const response: Res<null> = await auth.updateDetails(user_details, role);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message === "An error occurred") {
    return res.status(200).json(response);
  } else {
    return res.status(200).json(response);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const auth = new AuthService();
  const id = getIdFromToken(req);
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid or expired token",
      data: null,
    });
  }
  const role: "user" | "organizer" | "admin" = req.params.role as
    | "user"
    | "organizer"
    | "admin";
  const user_passwords: UserPasswords = req.body;
  if (
    !user_passwords.new_password ||
    !user_passwords.old_password ||
    !["user", "organizer", "admin"].includes(role)
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  user_passwords.id = id;
  const response: Res<null> = await auth.updatePassword(user_passwords, role);
  if (response.success) {
    return res.status(202).json(response);
  }
  return res.status(200).json(response);
};

export const verifyOrganizer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const organizerId: string = req.params.organizerId;
  if (!organizerId) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const auth = new AuthService();
  const response: Res<UserDetails | null> = await auth.verifyOrganizer(
    organizerId
  );
  if (response.success && response.data) {
    sendWelcomeApprovedOrganizerEmail(
      response.data.email,
      response.data.name.split(" ")[0]
    );
    return res.status(202).json(response);
  }
  return res.status(200).json(response);
};

export const activateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.userId;
  if (!userId) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const auth = new AuthService();
  const response: Res<null> = await auth.activateUser(userId);
  if (response.success) {
    return res.status(202).json(response);
  }
  return res.status(200).json(response);
};

export const deactivateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.userId;
  if (!userId) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const auth = new AuthService();
  const response: Res<null> = await auth.deactivateUser(userId);
  if (response.success) {
    return res.status(202).json(response);
  }
  return res.status(200).json(response);
};

export const activateOrganizer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const organizerId: string = req.params.organizerId;
  if (!organizerId) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const auth = new AuthService();
  const response: Res<null> = await auth.activateOrganizer(organizerId);
  if (response.success) {
    return res.status(202).json(response);
  }
  return res.status(200).json(response);
};

export const deactivateOrganizer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const organizerId: string = req.params.organizerId;
  if (!organizerId) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const auth = new AuthService();
  const response: Res<null> = await auth.deactivateOrganizer(organizerId);
  if (response.success) {
    return res.status(202).json(response);
  }
  return res.status(200).json(response);
};

export const activateAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const adminId: string = req.params.adminId;
  if (!adminId) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const auth = new AuthService();
  const response: Res<null> = await auth.activateAdmin(adminId);
  if (response.success) {
    return res.status(202).json(response);
  }
  return res.status(200).json(response);
};

export const deactivateAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const adminId: string = req.params.adminId;
  if (!adminId) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const auth = new AuthService();
  const response: Res<null> = await auth.deactivateAdmin(adminId);
  if (response.success) {
    return res.status(202).json(response);
  }
  return res.status(200).json(response);
};
