import { UserDetails } from './auth';
import { Event } from './event';

export interface Ticket {
  id: string;
  names: string[];
  quantity: number;
  eventTicketId: string;
  eventId: string;
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
  eventId: string;
  organizerId: string;
}

export interface TicketFinal {
  id: string;
  names: string[];
  quantity: number;
  eventTicket: EventTicket;
  event: Event;
  user: UserDetails;
  createdAt?: Date;
  updateAt?: Date;
}
