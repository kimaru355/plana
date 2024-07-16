import { Request, Response } from "express";
import { getIdFromToken } from "../helpers/get_id_from_token";
import {
  Ticket,
  TicketFinal,
  TicketFinalImagesArray,
  TicketNamesArray,
} from "../interfaces/ticket";
import { v4 } from "uuid";
import { TicketService } from "../services/ticket.service";
import { Res } from "../interfaces/res";

export const createTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ticketNamesArray: TicketNamesArray = req.body;
  ticketNamesArray.userId = getIdFromToken(req);
  if (!ticketNamesArray.userId) {
    return res.status(200).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }
  const ticket: Ticket = {
    ...ticketNamesArray,
    id: v4(),
    names: ticketNamesArray.names.join(":::::"),
  };
  if (
    !ticket.id ||
    !ticket.names ||
    !ticket.quantity ||
    !ticket.eventTicketId ||
    !ticket.eventId ||
    !ticket.userId ||
    Object.keys(ticket).length !== 6
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const ticketService = new TicketService();
  const response: Res<null> = await ticketService.createTicket(ticket);
  return res.status(200).json(response);
};

export const updateTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ticketNamesArray: TicketNamesArray = req.body;
  ticketNamesArray.userId = getIdFromToken(req);
  if (!ticketNamesArray.userId) {
    return res.status(200).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }
  const ticket: Ticket = {
    ...ticketNamesArray,
    id: v4(),
    names: ticketNamesArray.names.join(":::::"),
  };
  if (
    !ticket.id ||
    !ticket.names ||
    !ticket.quantity ||
    !ticket.eventTicketId ||
    !ticket.eventId ||
    !ticket.userId ||
    Object.keys(ticket).length !== 6
  ) {
    return res.status(200).json({
      success: false,
      message: "Invalid data",
      data: null,
    });
  }
  const ticketService = new TicketService();
  const response: Res<null> = await ticketService.updateTicket(ticket);
  return res.status(200).json(response);
};

export const getTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Ticket id not passed in params",
      data: null,
    });
  }
  const ticketService = new TicketService();
  const response: Res<TicketFinal | null> = await ticketService.getTicket(id);
  if (response.success && response.data) {
    const updatedResponse: TicketFinalImagesArray = {
      ...response.data,
      names: response.data.names.split(":::::"),
      event: {
        ...response.data.event,
        images: response.data.event.images.split(":::::"),
      },
    };
    return res.status(200).json(updatedResponse);
  }
  return res.status(200).json(response);
};

export const getTickets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ticketService = new TicketService();
  const response: Res<TicketFinal[] | null> =
    await ticketService.getAllTickets();
  if (response.success && response.data) {
    const updatedResponse: TicketFinalImagesArray[] = response.data.map(
      (ticket) => {
        return {
          ...ticket,
          names: ticket.names.split(":::::"),
          event: {
            ...ticket.event,
            images: ticket.event.images.split(":::::"),
          },
        };
      }
    );
    return res.status(200).json(updatedResponse);
  }
  return res.status(200).json(response);
};

export const getTicketsByEventId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventId: string = req.params.eventId;
  if (!eventId) {
    return res.status(200).json({
      success: false,
      message: "Event id not passed in params",
      data: null,
    });
  }
  const ticketService = new TicketService();
  const response: Res<TicketFinal[] | null> =
    await ticketService.getTicketsByEventId(eventId);
  if (response.success && response.data) {
    const updatedResponse: TicketFinalImagesArray[] = response.data.map(
      (ticket) => {
        return {
          ...ticket,
          names: ticket.names.split(":::::"),
          event: {
            ...ticket.event,
            images: ticket.event.images.split(":::::"),
          },
        };
      }
    );
    return res.status(200).json(updatedResponse);
  }
  return res.status(200).json(response);
};

export const getTicketsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = getIdFromToken(req);
  if (!userId) {
    return res.status(200).json({
      success: false,
      message: "Event id not passed in params",
      data: null,
    });
  }
  const ticketService = new TicketService();
  const response: Res<TicketFinal[] | null> =
    await ticketService.getTicketsByUserId(userId);
  if (response.success && response.data) {
    const updatedResponse: TicketFinalImagesArray[] = response.data.map(
      (ticket) => {
        return {
          ...ticket,
          names: ticket.names.split(":::::"),
          event: {
            ...ticket.event,
            images: ticket.event.images.split(":::::"),
          },
        };
      }
    );
    return res.status(200).json(updatedResponse);
  }
  return res.status(200).json(response);
};
