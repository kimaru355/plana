import { Event } from "./event";
import { Res } from "./res";

export interface ManageEventServices {
  createEvent(event: Event): Promise<Res<null>>;
  createEvents(events: Event[]): Promise<Res<null>>;
  updateEvent(event: Event): Promise<Res<null>>;
  deleteEvent(id: string): Promise<Res<null>>;
  getEvent(eventId: string, organizerId: string): Promise<Res<Event | null>>;
  getAllEvents(organizerId: string): Promise<Res<Event[] | null>>;
  getEventsByCategory(
    categoryId: string,
    organizerId: string
  ): Promise<Res<Event[] | null>>;
  getEventsByCountry(
    country: string,
    organizerId: string
  ): Promise<Res<Event[] | null>>;
  getEventsByTimeRange(
    min: Date,
    max: Date,
    organizerId: string
  ): Promise<Res<Event[] | null>>;
  getEventsByTicketPrice(
    min: number,
    max: number,
    organizerId: string
  ): Promise<Res<Event[] | null>>;
  getEventsByName(
    name: string,
    organizerId: string
  ): Promise<Res<Event[] | null>>;
}
