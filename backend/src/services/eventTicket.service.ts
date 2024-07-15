import { Prisma, PrismaClient } from "@prisma/client";
import { Event } from "../interfaces/event";
import { Res } from "../interfaces/res";
import { EventTicketServices } from "../interfaces/event_ticket_service";
import { EventTicket } from "../interfaces/ticket";

export class EventTicketService implements EventTicketServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createEventTicket(ticket: EventTicket): Promise<Res<null>> {
    try {
      await this.prisma.eventTicket.create({
        data: ticket,
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

  async createEventTickets(tickets: EventTicket[]): Promise<Res<null>> {
    try {
      await this.prisma.eventTicket.createMany({
        data: tickets,
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

  async updateEventTicket(ticket: EventTicket): Promise<Res<null>> {
    try {
      await this.prisma.eventTicket.update({
        where: {
          id: ticket.id,
        },
        data: ticket,
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

  async deleteEventTicket(ticketId: string): Promise<Res<null>> {
    try {
      const eventTicket = await this.prisma.eventTicket.findUnique({
        where: {
          id: ticketId,
        },
      });
      if (!eventTicket) {
        return {
          success: false,
          message: "Event ticket does not exist",
          data: null,
        };
      }
      const orders = await this.prisma.ticket.findMany({
        where: {
          eventTicketId: ticketId,
        },
      });
      if (orders.length > 0) {
        return {
          success: false,
          message: "There are tickets booked",
          data: null,
        };
      }
      await this.prisma.event.delete({
        where: {
          id: ticketId,
        },
      });
      return {
        success: true,
        message: "Event Ticket successfully deleted",
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

  async getEventTicket(ticketId: string): Promise<Res<EventTicket | null>> {
    try {
      const event: EventTicket | null =
        await this.prisma.eventTicket.findUnique({
          where: {
            id: ticketId,
          },
        });
      if (!event) {
        return {
          success: false,
          message: "Event ticket not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "Event ticket found",
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

  async getAllEventTickets(
    organizerId: string
  ): Promise<Res<EventTicket[] | null>> {
    try {
      const events: EventTicket[] = await this.prisma.eventTicket.findMany({
        where: {
          organizerId,
        },
      });
      return {
        success: true,
        message: "Event tickets found",
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

  async getEventTicketsByEventId(
    eventId: string,
    organizerId: string
  ): Promise<Res<EventTicket[] | null>> {
    try {
      const events = await this.prisma.eventTicket.findMany({
        where: {
          eventId: eventId,
          organizerId,
        },
      });
      return {
        success: true,
        message: "Event tickets found",
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
}
