import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';
import { Event } from '../interfaces/event';
import { ManageEventServices } from '../interfaces/manage_event_service';

@Injectable({
  providedIn: 'root',
})
export class ManageEventService implements ManageEventServices {
  private api: string = 'http://localhost:3000/manage-events';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
  });

  constructor(private http: HttpClient) {}
  createEvent(event: Event): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create`, event, {
      headers: this.headers,
    });
  }

  createEvents(events: Event[]): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create-many`, events, {
      headers: this.headers,
    });
  }

  updateEvent(event: Event): Observable<Res<null>> {
    return this.http.put<Res<null>>(`${this.api}/update`, event, {
      headers: this.headers,
    });
  }

  deleteEvent(eventId: string): Observable<Res<null>> {
    return this.http.delete<Res<null>>(`${this.api}/delete/${eventId}`, {
      headers: this.headers,
    });
  }

  getEvent(eventId: string): Observable<Res<Event | null>> {
    return this.http.get<Res<null>>(`${this.api}/${eventId}`, {
      headers: this.headers,
    });
  }

  getAllEvents(): Observable<Res<Event[] | null>> {
    return this.http.get<Res<null>>(`${this.api}/all`, {
      headers: this.headers,
    });
  }

  getEventsByCategory(categoryId: string): Observable<Res<Event[] | null>> {
    return this.http.get<Res<null>>(`${this.api}/category/${categoryId}`, {
      headers: this.headers,
    });
  }

  getEventsByCountry(country: string): Observable<Res<Event[] | null>> {
    return this.http.get<Res<null>>(`${this.api}/country/${country}`, {
      headers: this.headers,
    });
  }

  getEventsByTimeRange(min: Date, max: Date): Observable<Res<Event[] | null>> {
    return this.http.post<Res<null>>(
      `${this.api}/time`,
      {
        min,
        max,
      },
      {
        headers: this.headers,
      }
    );
  }

  getEventsByTicketPrice(
    min: number,
    max: number
  ): Observable<Res<Event[] | null>> {
    return this.http.post<Res<null>>(
      `${this.api}/price`,
      {
        min,
        max,
      },
      {
        headers: this.headers,
      }
    );
  }

  getEventsByName(name: string): Observable<Res<Event[] | null>> {
    return this.http.get<Res<null>>(`${this.api}/name/${name}`, {
      headers: this.headers,
    });
  }
}
