import { EventFinal, EventFinalImagesArray } from "./event";
import { TicketFinal, TicketFinalImagesArray } from "./ticket";

export interface OrganizerAnalytic {
  totalClients: number;
  totalTickets: number;
  totalEventTickets: number;
  totalEvents: number;
  totalRevenue: number;
  topTenBookedEvents: EventFinal[] | EventFinalImagesArray[];
  topTenRecentBookings: TicketFinal[] | TicketFinalImagesArray[];
}

export interface Analytic {
  totalUsers: number;
  totalOrders: number;
  totalCompleteOrders: number;
  totalIncompleteOrders: number;
  totalProducts: number;
  totalProductsSold: number;
  totalRevenue: number;
  topTenBookedEvents: EventFinal[] | EventFinalImagesArray[];
  totalCategories: number;
}
