import { EventTicket, Ticket, TicketFinal } from "./ticket";
import { Res } from "./res";

export interface EventTicketServices {
  createEventTicket(ticket: EventTicket): Promise<Res<null>>;
  updateEventTicket(ticket: EventTicket): Promise<Res<null>>;
  deleteEventTicket(ticketId: EventTicket): Promise<Res<null>>;
  getEventTicket(id: string): Promise<Res<TicketFinal[] | null>>;
  getAllEventTickets(): Promise<Res<TicketFinal[] | null>>;
  getEventTicketsByEventId(eventId: string): Promise<Res<TicketFinal[] | null>>;
  getEventTicketsByUserId(userId: string): Promise<Res<TicketFinal[] | null>>;
}
