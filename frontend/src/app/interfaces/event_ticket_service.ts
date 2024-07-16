import { EventTicket, Ticket, TicketFinal } from "./ticket";
import { Res } from "./res";

export interface EventTicketServices {
  createEventTicket(ticket: EventTicket): Promise<Res<null>>;
  createEventTickets(tickets: EventTicket[]): Promise<Res<null>>;
  updateEventTicket(ticket: EventTicket): Promise<Res<null>>;
  deleteEventTicket(ticketId: string): Promise<Res<null>>;
  getEventTicket(ticketId: string): Promise<Res<EventTicket | null>>;
  getAllEventTickets(organizerId: string): Promise<Res<EventTicket[] | null>>;
  getEventTicketsByEventId(
    eventId: string,
    organizerId: string
  ): Promise<Res<EventTicket[] | null>>;
}
