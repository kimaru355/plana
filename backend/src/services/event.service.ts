import { Prisma, PrismaClient } from "@prisma/client";
import { EventFinal } from "../interfaces/event";
import { Res } from "../interfaces/res";
import { eventServices } from "../interfaces/event_service";
import { EventTicket } from "../interfaces/ticket";

export class EventService implements eventServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async getEvent(eventId: string): Promise<Res<EventFinal | null>> {
    try {
      const event = await this.prisma.event.findUnique({
        where: {
          id: eventId,
        },
        include: {
          category: true,
        },
      });
      if (!event) {
        return {
          success: false,
          message: "event not found",
          data: null,
        };
      }
      const eventTickets = await this.prisma.eventTicket.findMany({
        where: {
          eventId: eventId,
        },
      });
      const eventFinal: EventFinal = {
        ...event,
        eventTickets,
      };
      return {
        success: true,
        message: "event found",
        data: eventFinal,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getAllEvents(): Promise<Res<EventFinal[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          startTime: {
            gt: new Date(),
          },
        },
        include: {
          category: true,
        },
      });
      const eventsFinal: EventFinal[] = await Promise.all(
        events.map(async (event) => {
          const eventTickets: EventTicket[] =
            await this.prisma.eventTicket.findMany({
              where: {
                eventId: event.id,
              },
            });
          return {
            ...event,
            eventTickets: eventTickets,
          };
        })
      );

      return {
        success: true,
        message: "events found",
        data: eventsFinal,
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
    categoryId: string
  ): Promise<Res<EventFinal[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          categoryId,
          startTime: {
            gt: new Date(),
          },
        },
        include: {
          category: true,
        },
      });
      const eventsFinal: EventFinal[] = await Promise.all(
        events.map(async (event) => {
          const eventTickets: EventTicket[] =
            await this.prisma.eventTicket.findMany({
              where: {
                eventId: event.id,
              },
            });
          return {
            ...event,
            eventTickets: eventTickets,
          };
        })
      );

      return {
        success: true,
        message: "events found",
        data: eventsFinal,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventsByName(name: string): Promise<Res<EventFinal[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          title: {
            contains: name,
          },
          startTime: {
            gt: new Date(),
          },
        },
        include: {
          category: true,
        },
      });
      const eventsFinal: EventFinal[] = await Promise.all(
        events.map(async (event) => {
          const eventTickets: EventTicket[] =
            await this.prisma.eventTicket.findMany({
              where: {
                eventId: event.id,
              },
            });
          return {
            ...event,
            eventTickets: eventTickets,
          };
        })
      );

      return {
        success: true,
        message: "events found",
        data: eventsFinal,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventsByCountry(country: string): Promise<Res<EventFinal[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          country,
          startTime: {
            gt: new Date(),
          },
        },
        include: {
          category: true,
        },
      });
      const eventsFinal: EventFinal[] = await Promise.all(
        events.map(async (event) => {
          const eventTickets: EventTicket[] =
            await this.prisma.eventTicket.findMany({
              where: {
                eventId: event.id,
              },
            });
          return {
            ...event,
            eventTickets: eventTickets,
          };
        })
      );

      return {
        success: true,
        message: "events found",
        data: eventsFinal,
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
  ): Promise<Res<EventFinal[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          startTime: {
            gt: new Date(),
          },
        },
        include: {
          category: true,
        },
      });
      const eventsFinal: EventFinal[] = await Promise.all(
        events.map(async (event) => {
          const eventTickets: EventTicket[] =
            await this.prisma.eventTicket.findMany({
              where: {
                eventId: event.id,
                price: {
                  gte: min,
                  lte: max,
                },
              },
            });
          return {
            ...event,
            eventTickets: eventTickets,
          };
        })
      );
      // const eventTickets = await this.prisma.eventTicket.findMany({
      //   where: {
      //     price: {
      //       gte: min,
      //       lte: max,
      //     },
      //   },
      // });
      // const events = await this.prisma.event.findMany({
      //   where: {
      //     startTime: {
      //       gt: new Date(),
      //     },
      //     id: {
      //       in: eventTickets.map((ticket) => ticket.eventId),
      //     },
      //   },
      //   include: {
      //     category: true,
      //   },
      // });
      return {
        success: true,
        message: "events found",
        data: eventsFinal,
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
  ): Promise<Res<EventFinal[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          startTime: {
            gte: min,
            lte: max,
          },
        },
        include: {
          category: true,
        },
      });
      const eventsFinal: EventFinal[] = await Promise.all(
        events.map(async (event) => {
          const eventTickets: EventTicket[] =
            await this.prisma.eventTicket.findMany({
              where: {
                eventId: event.id,
              },
            });
          return {
            ...event,
            eventTickets: eventTickets,
          };
        })
      );
      return {
        success: true,
        message: "events found",
        data: eventsFinal,
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
