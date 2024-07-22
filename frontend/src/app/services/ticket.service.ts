import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Res } from '../interfaces/res';
import { Ticket, TicketFinal } from '../interfaces/ticket';
import { Observable } from 'rxjs';
import { TicketServices } from '../interfaces/ticket_service';

@Injectable({
  providedIn: 'root',
})
export class TicketService implements TicketServices {
  private api: string = 'http://localhost:3000/tickets';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
  });

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create`, ticket, {
      headers: this.headers,
    });
  }

  updateTicket(ticket: Ticket): Observable<Res<null>> {
    return this.http.put<Res<null>>(`${this.api}/update/${ticket.id}`, ticket, {
      headers: this.headers,
    });
  }

  getTicket(id: string): Observable<Res<TicketFinal | null>> {
    return this.http.get<Res<null>>(`${this.api}/${id}`, {
      headers: this.headers,
    });
  }

  getTicketsByOrganizerId(): Observable<Res<TicketFinal[] | null>> {
    return this.http.get<Res<null>>(`${this.api}/organizer`, {
      headers: this.headers,
    });
  }

  getAllTickets(): Observable<Res<TicketFinal[] | null>> {
    return this.http.get<Res<null>>(`${this.api}/all`, {
      headers: this.headers,
    });
  }

  getTicketsByEventId(eventId: string): Observable<Res<TicketFinal[] | null>> {
    return this.http.get<Res<null>>(`${this.api}/event/${eventId}`, {
      headers: this.headers,
    });
  }

  getTicketsByUserId(): Observable<Res<TicketFinal[] | null>> {
    return this.http.get<Res<null>>(`${this.api}/user`, {
      headers: this.headers,
    });
  }
}
