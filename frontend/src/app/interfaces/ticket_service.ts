import { Ticket, TicketFinal } from './ticket';
import { Res } from './res';
import { Observable } from 'rxjs';

export interface TicketServices {
  createTicket(ticket: Ticket): Observable<Res<null>>;
  updateTicket(ticket: Ticket): Observable<Res<null>>;
  getTicket(id: string): Observable<Res<TicketFinal | null>>;
  getAllTickets(): Observable<Res<TicketFinal[] | null>>;
  getTicketsByEventId(eventId: string): Observable<Res<TicketFinal[] | null>>;
  getTicketsByOrganizerId(): Observable<Res<TicketFinal[] | null>>;
  getTicketsByUserId(userId: string): Observable<Res<TicketFinal[] | null>>;
}
