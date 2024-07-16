import { EventFinal } from "./event";
import { Res } from "./res";

export interface eventServices {
  getEvent(eventId: string): Promise<Res<EventFinal | null>>;
  getAllEvents(organizerId: string): Promise<Res<EventFinal[] | null>>;
  getEventsByCategory(categoryId: string): Promise<Res<EventFinal[] | null>>;
  getEventsByCountry(country: string): Promise<Res<EventFinal[] | null>>;
  getEventsByTimeRange(min: Date, max: Date): Promise<Res<EventFinal[] | null>>;
  getEventsByTicketPrice(
    min: number,
    max: number
  ): Promise<Res<EventFinal[] | null>>;
  getEventsByName(name: string): Promise<Res<EventFinal[] | null>>;
}
