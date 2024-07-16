import { PrismaClient } from "@prisma/client";
import { TicketServices } from "../interfaces/ticket_service";
import { EventTicket, Ticket, TicketFinal } from "../interfaces/ticket";
import { Res } from "../interfaces/res";
import { v4 } from "uuid";

export class TicketService implements TicketServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createTicket(ticket: Ticket): Promise<Res<null>> {
    try {
      const eventTicket: EventTicket | null =
        await this.prisma.eventTicket.findUnique({
          where: {
            id: ticket.eventTicketId,
          },
        });
      if (!eventTicket) {
        return {
          success: false,
          message: "Event ticket not found",
          data: null,
        };
      } else if (eventTicket.eventId !== ticket.eventId) {
        return {
          success: false,
          message: "Event ticket not for the specified event",
          data: null,
        };
      }
      if (eventTicket.quantity < ticket.quantity) {
        return {
          success: false,
          message: "Ticket quantity exceeds available",
          data: null,
        };
      }
      await this.prisma.$transaction([
        this.prisma.ticket.create({
          data: ticket,
        }),
        this.prisma.eventTicket.update({
          where: {
            id: ticket.eventTicketId,
          },
          data: {
            quantity: {
              decrement: ticket.quantity,
            },
          },
        }),
      ]);
      return {
        success: true,
        message: "Ticket successfully booked",
        data: null,
      };
    } catch (error: any) {
      if (error.message.includes("Foreign key constraint failed")) {
        return {
          success: false,
          message: "Invalid data",
          data: null,
        };
      }

      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async updateTicket(ticketUpdate: Ticket): Promise<Res<null>> {
    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: {
          id: ticketUpdate.id,
        },
      });
      if (!ticket) {
        return {
          success: false,
          message: "Ticket not found",
          data: null,
        };
      }
      const eventTicket: EventTicket | null =
        await this.prisma.eventTicket.findUnique({
          where: {
            id: ticket.eventTicketId,
          },
        });
      if (!eventTicket) {
        return {
          success: false,
          message: "Event ticket not found",
          data: null,
        };
      }
      if (eventTicket.quantity < ticket.quantity) {
        return {
          success: false,
          message: "Ticket quantity exceeds available",
          data: null,
        };
      }
      await this.prisma.$transaction([
        this.prisma.ticket.update({
          where: {
            id: ticketUpdate.id,
          },
          data: ticketUpdate,
        }),
        this.prisma.eventTicket.update({
          where: {
            id: ticket.eventTicketId,
          },
          data: {
            quantity: {
              decrement: ticketUpdate.quantity - ticket.quantity,
            },
          },
        }),
      ]);
      return {
        success: true,
        message: "Ticket successfully updated",
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

  async getAllTickets(): Promise<Res<TicketFinal[] | null>> {
    try {
      const ticket: TicketFinal[] = await this.prisma.ticket.findMany({
        include: {
          event: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              country: true,
            },
          },
          eventTicket: true,
        },
      });
      return {
        success: true,
        message: "Tickets successfully retrieved",
        data: ticket,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getTicket(id: string): Promise<Res<TicketFinal | null>> {
    try {
      const ticket: TicketFinal | null = await this.prisma.ticket.findUnique({
        where: {
          id,
        },
        include: {
          event: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              country: true,
            },
          },
          eventTicket: true,
        },
      });
      if (!ticket) {
        return {
          success: false,
          message: "Ticket not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "Ticket successfully retrieved",
        data: ticket,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getTicketsByEventId(
    eventId: string
  ): Promise<Res<TicketFinal[] | null>> {
    try {
      const ticket: TicketFinal[] = await this.prisma.ticket.findMany({
        where: {
          eventId,
        },
        include: {
          event: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              country: true,
            },
          },
          eventTicket: true,
        },
      });
      return {
        success: true,
        message: "Tickets successfully retrieved",
        data: ticket,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getTicketsByUserId(userId: string): Promise<Res<TicketFinal[] | null>> {
    try {
      const ticket: TicketFinal[] = await this.prisma.ticket.findMany({
        where: {
          userId,
        },
        include: {
          event: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              country: true,
            },
          },
          eventTicket: true,
        },
      });
      return {
        success: true,
        message: "Tickets successfully retrieved",
        data: ticket,
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
