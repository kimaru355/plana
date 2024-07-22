import { EventFinal } from './event';
import { TicketFinal } from './ticket';

export interface OrganizerAnalytic {
  totalClients: number;
  totalTickets: number;
  totalEventTickets: number;
  totalEvents: number;
  totalRevenue: number;
  topTenBookedEvents: EventFinal[];
  topTenRecentBookings: TicketFinal[];
}

export interface AdminAnalytic {
  totalClients: number;
  totalHosts: number;
  totalTickets: number;
  totalEventTickets: number;
  totalEvents: number;
  totalRevenue: number;
  topTenBookedEvents: EventFinal[];
  topTenRecentBookings: TicketFinal[];
}
