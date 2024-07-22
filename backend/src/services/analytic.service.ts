import { PrismaClient } from "@prisma/client";
import { OrganizerAnalytic, AdminAnalytic } from "../interfaces/analytic";
import { AnalyticServices } from "../interfaces/analytic_service";
import { Res } from "../interfaces/res";
import { EventTicket, Ticket, TicketFinal } from "../interfaces/ticket";
import { EventFinal } from "../interfaces/event";

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
      const totalEventTickets: number = eventTickets.length;
      const tickets: Ticket[] = await this.prisma.ticket.findMany({
        where: {
          eventTicketId: {
            in: eventTickets.map((eventTicket) => eventTicket.id),
          },
        },
      });
      const totalTickets = tickets.length;
      let clientIds: string[] = [];
      tickets.map((ticket) => {
        if (!clientIds.includes(ticket.id)) {
          clientIds.push(ticket.id);
        }
      });
      const totalClients = clientIds.length;
      const totalEvents: number = await this.prisma.event.count({
        where: {
          organizerId,
        },
      });
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
        .sort((a, b) => b.capacity - b.quantity - (a.capacity - a.quantity))
        .slice(0, 10)
        .map((eventTicket) => eventTicket.eventId);
      const topTenBookedEvents1 = await this.prisma.event.findMany({
        where: {
          id: {
            in: topTenBookedEventsIds,
          },
        },
        include: {
          category: true,
        },
      });
      const topTenBookedEvents: EventFinal[] = topTenBookedEvents1.map(
        (event) => {
          return {
            ...event,
            eventTickets: eventTickets.filter(
              (eventTicket) => eventTicket.eventId === event.id
            ),
          };
        }
      );
      const topTenRecentBookings: TicketFinal[] =
        await this.prisma.ticket.findMany({
          where: {
            eventTicketId: {
              in: eventTickets.map((eventTicket) => eventTicket.id),
            },
          },
          include: {
            eventTicket: true,
            event: true,
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        });

      const analytic: OrganizerAnalytic = {
        totalClients,
        totalTickets,
        totalEventTickets,
        totalEvents,
        totalRevenue,
        topTenBookedEvents,
        topTenRecentBookings,
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
      const totalClients: number = await this.prisma.user.count();
      const totalHosts: number = await this.prisma.organizer.count();
      const totalTickets: number = await this.prisma.ticket.count();
      const totalEventTickets: number = await this.prisma.eventTicket.count();
      const totalEvents: number = await this.prisma.event.count();
      const tickets = await this.prisma.ticket.findMany({
        include: {
          eventTicket: true,
          event: true,
        },
      });
      const totalRevenue: number = tickets.reduce((acc, ticket) => {
        return acc + ticket.quantity * ticket.eventTicket.price;
      }, 0);
      const topTenBookedEvents: EventFinal[] = [];
      const topTenRecentBookings: TicketFinal[] =
        await this.prisma.ticket.findMany({
          include: {
            eventTicket: true,
            event: true,
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        });

      const analytic: AdminAnalytic = {
        totalClients,
        totalHosts,
        totalTickets,
        totalEventTickets,
        totalEvents,
        totalRevenue,
        topTenBookedEvents,
        topTenRecentBookings,
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
