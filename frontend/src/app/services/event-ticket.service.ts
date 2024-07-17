import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventTicket } from '../interfaces/ticket';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';
import { EventTicketServices } from '../interfaces/event_ticket_service';

@Injectable({
  providedIn: 'root',
})
export class EventTicketService implements EventTicketServices {
  private api: string = 'http://localhost:3000/event-tickets';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
  });

  constructor(private http: HttpClient) {}
  createEventTicket(ticket: EventTicket): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create`, ticket, {
      headers: this.headers,
    });
  }
  createEventTickets(tickets: EventTicket[]): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create-many`, tickets, {
      headers: this.headers,
    });
  }
  updateEventTicket(ticket: EventTicket): Observable<Res<null>> {
    return this.http.post<Res<null>>(
      `${this.api}/update/${ticket.id}`,
      ticket,
      { headers: this.headers }
    );
  }
  deleteEventTicket(ticketId: string): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/delete/${ticketId}`, {
      headers: this.headers,
    });
  }
  getEventTicket(ticketId: string): Observable<Res<EventTicket | null>> {
    return this.http.post<Res<null>>(`${this.api}/${ticketId}`, {
      headers: this.headers,
    });
  }
  getAllEventTickets(): Observable<Res<EventTicket[] | null>> {
    return this.http.post<Res<null>>(`${this.api}/all`, {
      headers: this.headers,
    });
  }
  getEventTicketsByEventId(
    eventId: string
  ): Observable<Res<EventTicket[] | null>> {
    return this.http.post<Res<null>>(`${this.api}/event/${eventId}`, {
      headers: this.headers,
    });
  }
}
