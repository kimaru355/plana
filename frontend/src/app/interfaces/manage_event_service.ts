import { Observable } from 'rxjs';
import { Event } from './event';
import { Res } from './res';

export interface ManageEventServices {
  createEvent(event: Event): Observable<Res<null>>;
  createEvents(events: Event[]): Observable<Res<null>>;
  updateEvent(event: Event): Observable<Res<null>>;
  deleteEvent(id: string): Observable<Res<null>>;
  getEvent(eventId: string, organizerId: string): Observable<Res<Event | null>>;
  getAllEvents(organizerId: string): Observable<Res<Event[] | null>>;
  getEventsByCategory(
    categoryId: string,
    organizerId: string
  ): Observable<Res<Event[] | null>>;
  getEventsByCountry(
    country: string,
    organizerId: string
  ): Observable<Res<Event[] | null>>;
  getEventsByTimeRange(
    min: Date,
    max: Date,
    organizerId: string
  ): Observable<Res<Event[] | null>>;
  getEventsByTicketPrice(
    min: number,
    max: number,
    organizerId: string
  ): Observable<Res<Event[] | null>>;
  getEventsByName(
    name: string,
    organizerId: string
  ): Observable<Res<Event[] | null>>;
}
