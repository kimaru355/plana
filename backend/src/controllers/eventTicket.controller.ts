import { Request, Response } from "express";
import { Res } from "../interfaces/res";
import { v4 } from "uuid";
import { getIdFromToken } from "../helpers/get_id_from_token";
import { EventTicket } from "../interfaces/ticket";
import { EventTicketService } from "../services/eventTicket.service";

export const createEventTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicket: EventTicket = req.body;
  eventTicket.organizerId = getIdFromToken(req);
  eventTicket.id = v4();
  if (
    !eventTicket.id ||
    !eventTicket.organizerId ||
    !eventTicket.name ||
    !eventTicket.type ||
    !eventTicket.price ||
    !eventTicket.persons ||
    !eventTicket.quantity ||
    !eventTicket.capacity ||
    !eventTicket.eventId
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const eventTicketService = new EventTicketService();
  const response: Res<null> = await eventTicketService.createEventTicket(
    eventTicket
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const createEventTickets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTickets: EventTicket[] = req.body;
  const organizerId = getIdFromToken(req);
  eventTickets.forEach((eventTicket) => {
    return {
      ...eventTicket,
      id: v4(),
      organizerId: organizerId,
    };
  });
  let isDataValid: boolean = true;
  eventTickets.map((eventTicket) => {
    if (
      !eventTicket.id ||
      !eventTicket.organizerId ||
      !eventTicket.name ||
      !eventTicket.type ||
      !eventTicket.price ||
      !eventTicket.persons ||
      !eventTicket.quantity ||
      !eventTicket.capacity ||
      !eventTicket.eventId
    ) {
      isDataValid = false;
    }
  });
  if (!isDataValid) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const eventTicketService = new EventTicketService();
  const response: Res<null> = await eventTicketService.createEventTickets(
    eventTickets
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const updateEventTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const eventTicket: EventTicket = req.body();
  const response: Res<null> = await eventTicketService.updateEventTicket(
    eventTicket
  );
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const deleteEventTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const id: string = req.params.id;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Please provide an id",
      data: null,
    });
  }
  const response: Res<null> = await eventTicketService.deleteEventTicket(id);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEventTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const id: string = req.params.id;
  const response: Res<EventTicket | null> =
    await eventTicketService.getEventTicket(id);
  if (response.success) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getAllEventTickets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const organizerId = getIdFromToken(req);
  const response: Res<EventTicket[] | null> =
    await eventTicketService.getAllEventTickets(organizerId);
  if (response.success && response.data) {
    return res.status(200).json(response);
  } else if (response.message !== "An Error Occurred") {
    return res.status(200).json(response);
  }
  return res.status(200).json(response);
};

export const getEventTicketsByEventId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventTicketService = new EventTicketService();
  const eventId: string = req.params.eventId;
  const organizerId = getIdFromToken(req);
  const response: Res<EventTicket[] | null> =
    await eventTicketService.getEventTicketsByEventId(eventId, organizerId);
  return res.status(200).json(response);
};
