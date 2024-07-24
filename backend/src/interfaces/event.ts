import { EventCategory } from "./category";
import { EventTicket } from "./ticket";

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  country: string;
  city: string;
  location: string;
  capacity: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  organizerId: string;
  categoryId: string;
}

export interface EventFinal {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  country: string;
  city: string;
  location: string;
  capacity: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  organizerId: string;
  categoryId: string;
  category: EventCategory;
  eventTickets: EventTicket[];
}
