import { Event } from "./event";
import { Res } from "./res";

export interface EventServices {
  createEvent(event: Event): Promise<Res<null>>;
  createEvents(events: Event[]): Promise<Res<null>>;
  updateEvent(event: Event): Promise<Res<null>>;
  deleteEvent(id: string): Promise<Res<null>>;
  getEvent(eventId: string): Promise<Res<Event | null>>;
  getAllEvents(): Promise<Res<Event[] | null>>;
  getEventsByCategory(categoryId: string): Promise<Res<Event[] | null>>;
  getEventsByCountry(country: string): Promise<Res<Event[] | null>>;
  getEventsByTimeRange(min: Date, max: Date): Promise<Res<Event[] | null>>;
  getEventsByTicketPrice(
    min: number,
    max: number
  ): Promise<Res<Event[] | null>>;
  getEventsByName(name: string): Promise<Res<Event[] | null>>;
}
