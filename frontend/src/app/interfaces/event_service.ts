import { Observable } from 'rxjs';
import { EventFinal } from './event';
import { Res } from './res';

export interface eventServices {
  getEvent(eventId: string): Observable<Res<EventFinal | null>>;
  getAllEvents(organizerId: string): Observable<Res<EventFinal[] | null>>;
  getEventsByCategory(categoryId: string): Observable<Res<EventFinal[] | null>>;
  getEventsByCountry(country: string): Observable<Res<EventFinal[] | null>>;
  getEventsByTimeRange(
    min: Date,
    max: Date
  ): Observable<Res<EventFinal[] | null>>;
  getEventsByTicketPrice(
    min: number,
    max: number
  ): Observable<Res<EventFinal[] | null>>;
  getEventsByName(name: string): Observable<Res<EventFinal[] | null>>;
}
