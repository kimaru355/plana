import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyOrganizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(200)
      .json({ success: false, message: "Access denied", data: null });
  }
  try {
    const payload: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    if (typeof payload === "string" || !payload["role"]) {
      return res
        .status(200)
        .json({ success: false, message: "Access denied", data: null });
    }
    const { role } = payload;
    if (role === "organizer") {
      next();
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Access denied", data: null });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Invalid or expired token",
      data: null,
    });
  }
};
