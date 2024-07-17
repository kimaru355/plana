import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';
import { EventFinal } from '../interfaces/event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { eventServices } from '../interfaces/event_service';

@Injectable({
  providedIn: 'root',
})
export class EventService implements eventServices {
  private api: string = 'http://localhost:3000/events';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
  });
  constructor(private http: HttpClient) {}

  getEvent(eventId: string): Observable<Res<EventFinal | null>> {
    return this.http.get<Res<EventFinal | null>>(`${this.api}/${eventId}`, {
      headers: this.headers,
    });
  }
  getAllEvents(): Observable<Res<EventFinal[] | null>> {
    return this.http.get<Res<EventFinal[] | null>>(`${this.api}/all`, {
      headers: this.headers,
    });
  }
  getEventsByCategory(
    categoryId: string
  ): Observable<Res<EventFinal[] | null>> {
    return this.http.get<Res<EventFinal[] | null>>(
      `${this.api}/category/${categoryId}`,
      {
        headers: this.headers,
      }
    );
  }
  getEventsByCountry(country: string): Observable<Res<EventFinal[] | null>> {
    return this.http.get<Res<EventFinal[] | null>>(
      `${this.api}/country/${country}`,
      {
        headers: this.headers,
      }
    );
  }
  getEventsByTimeRange(
    min: Date,
    max: Date
  ): Observable<Res<EventFinal[] | null>> {
    return this.http.post<Res<EventFinal[] | null>>(
      `${this.api}/price`,
      { min, max },
      {
        headers: this.headers,
      }
    );
  }
  getEventsByTicketPrice(
    min: number,
    max: number
  ): Observable<Res<EventFinal[] | null>> {
    return this.http.post<Res<EventFinal[] | null>>(
      `${this.api}/time`,
      { min, max },
      {
        headers: this.headers,
      }
    );
  }
  getEventsByName(name: string): Observable<Res<EventFinal[] | null>> {
    return this.http.get<Res<EventFinal[] | null>>(`${this.api}/name/${name}`, {
      headers: this.headers,
    });
  }
}
