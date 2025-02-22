import { Request, Response } from "express";
import { getIdFromToken } from "../helpers/get_id_from_token";
import { Ticket, TicketFinal } from "../interfaces/ticket";
import { v4 } from "uuid";
import { TicketService } from "../services/ticket.service";
import { Res } from "../interfaces/res";
import { sendTicketBookedEmail } from "../background-services/mailer";
import { UsersService } from "../services/users.service";
import { User } from "../interfaces/user";

export const createTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ticket: Ticket = req.body;
  ticket.userId = getIdFromToken(req);
  if (!ticket.userId) {
    return res.status(200).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }
  ticket.id = v4();
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
  if (response.success) {
    const usersService = new UsersService();
    const userResponse: Res<User | null> = await usersService.getUser(
      ticket.userId
    );
    const ticketResponse: Res<TicketFinal | null> =
      await ticketService.getTicket(ticket.id);
    if (
      userResponse.success &&
      userResponse.data &&
      ticketResponse.success &&
      ticketResponse.data
    ) {
      sendTicketBookedEmail(userResponse.data.email, ticketResponse.data);
    }
  }
  return res.status(200).json(response);
};

export const updateTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ticket: Ticket = req.body;
  ticket.userId = getIdFromToken(req);
  if (!ticket.userId) {
    return res.status(200).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }
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
  return res.status(200).json(response);
};

export const getTickets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ticketService = new TicketService();
  const response: Res<TicketFinal[] | null> =
    await ticketService.getAllTickets();
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
  return res.status(200).json(response);
};

export const getOrganizerTickets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const organizerId: string = getIdFromToken(req);
  if (!organizerId) {
    return res.status(200).json({
      success: false,
      message: "Invalid token",
      data: null,
    });
  }
  const ticketService = new TicketService();
  const response: Res<TicketFinal[] | null> =
    await ticketService.getTicketsByOrganizerId(organizerId);
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
  return res.status(200).json(response);
};
