import { Request, Response } from "express";
import { Res } from "../interfaces/res";
import { EventFinal } from "../interfaces/event";
import { getIdFromToken } from "../helpers/get_id_from_token";
import { EventService } from "../services/event.service";

export const getEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const id: string = req.params.id;
  const response: Res<EventFinal | null> = await eventService.getEvent(id);
  return res.status(200).json(response);
};

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const response: Res<EventFinal[] | null> = await eventService.getAllEvents();
  return res.status(200).json(response);
};

export const getEventsByCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const eventCategory: string = req.params.eventCategory;
  const organizerId = getIdFromToken(req);
  const response: Res<EventFinal[] | null> =
    await eventService.getEventsByCategory(eventCategory);
  return res.status(200).json(response);
};

export const getEventsByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const eventName: string = req.params.eventName;
  const organizerId = getIdFromToken(req);
  const response: Res<EventFinal[] | null> = await eventService.getEventsByName(
    eventName
  );
  return res.status(200).json(response);
};

export const getEventsByCountry = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const eventCountry: string = req.params.eventCountry;
  if (!eventCountry) {
    return res.status(200).json({
      success: false,
      message: "Please provide a country to filter events by",
      data: null,
    });
  }
  const organizerId = getIdFromToken(req);
  const response: Res<EventFinal[] | null> =
    await eventService.getEventsByCountry(eventCountry);
  return res.status(200).json(response);
};

export const getEventsByTicketPrice = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const { min, max } = req.body as { min: number; max: number };
  if (!min || !max) {
    return res.status(200).json({
      success: false,
      message: "Please provide a price range",
      data: null,
    });
  }
  const organizerId = getIdFromToken(req);
  const response: Res<EventFinal[] | null> =
    await eventService.getEventsByTicketPrice(min, max);
  return res.status(200).json(response);
};

export const getEventsByTimeRange = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventService = new EventService();
  const { min, max } = req.body as { min: Date; max: Date };
  if (!min || !max) {
    return res.status(200).json({
      success: false,
      message: "Please provide a time range",
      data: null,
    });
  }
  const organizerId = getIdFromToken(req);
  const response: Res<EventFinal[] | null> =
    await eventService.getEventsByTimeRange(min, max);
  return res.status(200).json(response);
};
