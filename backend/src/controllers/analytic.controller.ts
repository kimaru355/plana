import { Request, Response } from "express";
import { AnalyticService } from "../services/analytic.service";
import { getIdFromToken } from "../helpers/get_id_from_token";

export const getOrganizerAnalytics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const organizerId = getIdFromToken(req);
  if (!organizerId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
  }
  const analyticService: AnalyticService = new AnalyticService();
  const response = await analyticService.getOrganizerAnalytics(organizerId);
  return res.status(200).json(response);
};

export const getAdminAnalytics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const analyticService: AnalyticService = new AnalyticService();
  const response = await analyticService.getAdminAnalytics();
  return res.status(200).json(response);
};
