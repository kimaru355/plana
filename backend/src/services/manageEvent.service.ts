import { Prisma, PrismaClient } from "@prisma/client";
import { Event } from "../interfaces/event";
import { ManageEventServices } from "../interfaces/manage_event_service";
import { Res } from "../interfaces/res";

export class ManageEventService implements ManageEventServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createEvent(event: Event): Promise<Res<null>> {
    try {
      await this.prisma.event.create({
        data: event,
      });
      return {
        success: true,
        message: "event successfully created",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async createEvents(events: Event[]): Promise<Res<null>> {
    try {
      await this.prisma.event.createMany({
        data: events,
      });
      return {
        success: true,
        message: "events successfully created",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async updateEvent(event: Event): Promise<Res<null>> {
    try {
      await this.prisma.event.update({
        where: {
          id: event.id,
        },
        data: event,
      });
      return {
        success: true,
        message: "event successfully updated",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async deleteEvent(id: string): Promise<Res<null>> {
    try {
      const event = await this.prisma.event.findUnique({
        where: {
          id: id,
        },
      });
      if (!event) {
        return {
          success: false,
          message: "event does not exist",
          data: null,
        };
      }
      const orders = await this.prisma.ticket.findMany({
        where: {
          eventId: id,
        },
      });
      if (orders.length > 0) {
        return {
          success: false,
          message: "There are tickets for this event that have been booked",
          data: null,
        };
      }
      await this.prisma.event.delete({
        where: {
          id: id,
        },
      });
      await this.prisma.deletedEvent.create({
        data: event,
      });
      return {
        success: true,
        message: "event successfully deleted",
        data: null,
      };
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.message.includes("Record to update not found")) {
          return {
            success: false,
            message: "event not found",
            data: null,
          };
        }
      }

      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEvent(
    eventId: string,
    organizerId: string
  ): Promise<Res<Event | null>> {
    try {
      const event: Event | null = await this.prisma.event.findUnique({
        where: {
          id: eventId,
          organizerId: organizerId,
        },
      });
      if (!event) {
        return {
          success: false,
          message: "event not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "event found",
        data: event,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getAllEvents(organizerId: string): Promise<Res<Event[] | null>> {
    try {
      const events: Event[] = await this.prisma.event.findMany({
        where: {
          organizerId,
          startTime: {
            gt: new Date(),
          },
        },
      });
      return {
        success: true,
        message: "events found",
        data: events,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventsByCategory(
    categoryId: string,
    organizerId: string
  ): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          categoryId: categoryId,
          organizerId,
          startTime: {
            gt: new Date(),
          },
        },
      });
      return {
        success: true,
        message: "events found",
        data: events,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventsByName(
    eventName: string,
    organizerId: string
  ): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          organizerId,
          title: {
            contains: eventName,
          },
          startTime: {
            gt: new Date(),
          },
        },
      });
      return {
        success: true,
        message: "events found",
        data: events,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventsByCountry(
    country: string,
    organizerId: string
  ): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          organizerId,
          country: country,
          startTime: {
            gt: new Date(),
          },
        },
      });
      return {
        success: true,
        message: "events found",
        data: events,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventsByTicketPrice(
    min: number,
    max: number,
    organizerId: string
  ): Promise<Res<Event[] | null>> {
    try {
      const eventTickets = await this.prisma.eventTicket.findMany({
        where: {
          price: {
            gte: min,
            lte: max,
          },
        },
      });
      const events = await this.prisma.event.findMany({
        where: {
          organizerId,
          startTime: {
            gt: new Date(),
          },
          id: {
            in: eventTickets.map((ticket) => ticket.eventId),
          },
        },
        include: {
          Ticket: {},
        },
      });
      return {
        success: true,
        message: "events found",
        data: events,
      };
    } catch {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventsByTimeRange(
    min: Date,
    max: Date,
    organizerId: string
  ): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          organizerId,
          startTime: {
            gte: min,
            lte: max,
          },
        },
      });
      return {
        success: true,
        message: "events found",
        data: events,
      };
    } catch {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }
}
