import { EventTicket } from './ticket';
import { Res } from './res';
import { Observable } from 'rxjs';

export interface EventTicketServices {
  createEventTicket(ticket: EventTicket): Observable<Res<null>>;
  createEventTickets(tickets: EventTicket[]): Observable<Res<null>>;
  updateEventTicket(ticket: EventTicket): Observable<Res<null>>;
  deleteEventTicket(ticketId: string): Observable<Res<null>>;
  getEventTicket(ticketId: string): Observable<Res<EventTicket | null>>;
  getAllEventTickets(): Observable<Res<EventTicket[] | null>>;
  getEventTicketsByEventId(
    eventId: string
  ): Observable<Res<EventTicket[] | null>>;
}
