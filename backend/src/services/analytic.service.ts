import { PrismaClient } from "@prisma/client";
import { OrganizerAnalytic, AdminAnalytic } from "../interfaces/analytic";
import { AnalyticServices } from "../interfaces/analytic_service";
import { Res } from "../interfaces/res";
import { EventTicket, Ticket } from "../interfaces/ticket";

export class AnalyticService implements AnalyticServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async getOrganizerAnalytics(
    organizerId: string
  ): Promise<Res<OrganizerAnalytic | null>> {
    try {
      const eventTickets: EventTicket[] =
        await this.prisma.eventTicket.findMany({
          where: {
            organizerId,
          },
        });
      const tickets: Ticket[] = await this.prisma.ticket.findMany({
        where: {
          eventTicketId: {
            in: eventTickets.map((eventTicket) => eventTicket.id),
          },
        },
      });
      let clientIds: string[] = [];
      tickets.map((ticket) => {
        if (!clientIds.includes(ticket.id)) {
          clientIds.push(ticket.id);
        }
      });
      let eventIds: string[] = [];
      eventTickets.map((eventTicket) => {
        if (!eventIds.includes(eventTicket.eventId)) {
          eventIds.push(eventTicket.eventId);
        }
      });
      const totalClients = clientIds.length;
      const totalTickets = tickets.length;
      const totalEventTickets: number = eventTickets.length;
      const totalEvents = eventIds.length;
      const totalRevenue = tickets.reduce((acc, ticket) => {
        const eventTickets1 = eventTickets.filter(
          (eventTicket1) => eventTicket1.id === ticket.eventTicketId
        );
        if (eventTickets1.length !== 1) {
          return acc;
        }
        return acc + ticket.quantity * eventTickets1[0].price;
      }, 0);
      const topTenBookedEventsIds: string[] = eventTickets
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10)
        .map((eventTicket) => eventTicket.eventId);

      const analytic: OrganizerAnalytic = {
        totalClients,
        totalTickets,
        totalEventTickets,
        totalEvents,
        totalRevenue,
        // topTenBookedEvents,
        // topTenRecentBookings,
      };
      return {
        success: true,
        message: "Analytics retrieved successfully",
        data: analytic,
      };
    } catch {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async getAdminAnalytics(): Promise<Res<AdminAnalytic | null>> {
    try {
      const eventTickets: EventTicket[] =
        await this.prisma.eventTicket.findMany({
          where: {},
        });
      const tickets: Ticket[] = await this.prisma.ticket.findMany({
        where: {
          eventTicketId: {
            in: eventTickets.map((eventTicket) => eventTicket.id),
          },
        },
      });
      let clientIds: string[] = [];
      tickets.map((ticket) => {
        if (!clientIds.includes(ticket.id)) {
          clientIds.push(ticket.id);
        }
      });
      let eventIds: string[] = [];
      eventTickets.map((eventTicket) => {
        if (!eventIds.includes(eventTicket.eventId)) {
          eventIds.push(eventTicket.eventId);
        }
      });
      const totalClients = await this.prisma.user.count();
      const totalTickets = await this.prisma.ticket.count();
      const totalEventTickets: number = await this.prisma.eventTicket.count();
      const totalEvents = await this.prisma.event.count();
      const totalHosts = await this.prisma.organizer.count();
      const totalRevenue = tickets.reduce((acc, ticket) => {
        const eventTickets1 = eventTickets.filter(
          (eventTicket1) => eventTicket1.id === ticket.eventTicketId
        );
        if (eventTickets1.length !== 1) {
          return acc;
        }
        return acc + ticket.quantity * eventTickets1[0].price;
      }, 0);
      const topTenBookedEventsIds: string[] = eventTickets
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10)
        .map((eventTicket) => eventTicket.eventId);

      const analytic: AdminAnalytic = {
        totalClients,
        totalHosts,
        totalTickets,
        totalEventTickets,
        totalEvents,
        totalRevenue,
        // topTenBookedEvents,
        // topTenRecentBookings,
      };
      return {
        success: true,
        message: "Analytics retrieved successfully",
        data: analytic,
      };
    } catch {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }
}
