import { Prisma, PrismaClient } from "@prisma/client";
import { Event } from "../interfaces/event";
import { EventServices } from "../interfaces/event_service";
import { Res } from "../interfaces/res";

export class EventService implements EventServices {
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
          message: "There are orders for this event that are not completed",
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

  async getEvent(eventId: string): Promise<Res<Event | null>> {
    try {
      const event: Event | null = await this.prisma.event.findUnique({
        where: {
          id: eventId,
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

  async getAllEvents(): Promise<Res<Event[] | null>> {
    try {
      const events: Event[] = await this.prisma.event.findMany({
        where: {
          dateTime: {
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

  async getEventsByCategory(categoryId: string): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          categoryId: categoryId,
          dateTime: {
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

  async getEventsByName(eventName: string): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          title: {
            contains: eventName,
          },
          dateTime: {
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

  async getEventsByCountry(country: string): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          country: country,
          dateTime: {
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
    max: number
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
          dateTime: {
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
    max: Date
  ): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          dateTime: {
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
