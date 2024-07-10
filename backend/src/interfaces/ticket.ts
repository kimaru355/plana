import { UserDetails } from "./auth";
import { Event, EventImagesArray } from "./event";

export interface Ticket {
  id: string;
  names: string;
  eventTicketId: string;
  eventId: string;
  userId: string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface TicketNamesArray {
  id: string;
  names: string[];
  eventTicketId: string;
  eventId: string;
  userId: string;
  createdAt?: Date;
  updateAt?: Date;
}
export interface EventTicket {
  id: string;
  name: string;
  type: string;
  price: number;
  persons: number;
  quantity: number;
  capacity: number;
  createdAt?: Date;
  updatedAt?: Date;
  eventId: String;
}

export interface TicketFinal {
  id: string;
  names: string[];
  eventTicket: EventTicket;
  event: Event;
  user: UserDetails;
  createdAt?: Date;
  updateAt?: Date;
}
