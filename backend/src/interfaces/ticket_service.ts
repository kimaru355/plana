import { Ticket, TicketFinal } from "./ticket";
import { Res } from "./res";

export interface TicketServices {
  createTicket(ticket: Ticket): Promise<Res<null>>;
  updateTicket(ticket: Ticket): Promise<Res<null>>;
  deleteTicket(ticketId: Ticket): Promise<Res<null>>;
  getTicket(id: string): Promise<Res<TicketFinal[] | null>>;
  getAllTickets(): Promise<Res<TicketFinal[] | null>>;
  getTicketsByEventId(eventId: string): Promise<Res<TicketFinal[] | null>>;
  getTicketsByUserId(userId: string): Promise<Res<TicketFinal[] | null>>;
}
