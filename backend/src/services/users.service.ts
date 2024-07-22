import { PrismaClient } from "@prisma/client";
import { UsersServices } from "../interfaces/users_service";
import { Res } from "../interfaces/res";
import { User } from "../interfaces/user";
import { TicketFinal } from "../interfaces/ticket";
import { UserDetails } from "../interfaces/auth";

export class UsersService implements UsersServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async getUsers(): Promise<Res<User[] | null>> {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          imageUrl: true,
          phoneNumber: true,
          country: true,
        },
      });
      return {
        success: true,
        message: "Users successfully retrieved",
        data: users,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getClients(organizerId: string): Promise<Res<UserDetails[] | null>> {
    try {
      const tickets: TicketFinal[] = await this.prisma.ticket.findMany({
        include: {
          event: true,
          user: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              email: true,
              phoneNumber: true,
              country: true,
            },
          },
          eventTicket: true,
        },
      });
      const clients: UserDetails[] = [];
      tickets.map((ticket) => {
        if (
          ticket.event.organizerId === organizerId &&
          !clients.includes(ticket.user)
        ) {
          clients.push(ticket.user);
        }
      });
      return {
        success: true,
        message: "Users successfully retrieved",
        data: clients,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getOrganizers(): Promise<Res<User[] | null>> {
    try {
      const users = await this.prisma.organizer.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          imageUrl: true,
          phoneNumber: true,
          country: true,
        },
      });
      return {
        success: true,
        message: "Users successfully retrieved",
        data: users,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getAdmins(): Promise<Res<User[] | null>> {
    try {
      const users = await this.prisma.admin.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          imageUrl: true,
          country: true,
        },
      });
      return {
        success: true,
        message: "Users successfully retrieved",
        data: users,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getUser(id: string): Promise<Res<User | null>> {
    try {
      const user = await this.prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          name: true,
          imageUrl: true,
          phoneNumber: true,
          country: true,
        },
        where: { id, isDeactivated: false },
      });
      if (!user) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "User successfully retrieved",
        data: user,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  // async isAdmin(id: string): Promise<Res<boolean>> {
  //   try {
  //     const user = await this.prisma.user.findUnique({
  //       select: {
  //         role: true,
  //       },
  //       where: { id },
  //     });
  //     if (!user) {
  //       return {
  //         success: false,
  //         message: "User not found",
  //         data: false,
  //       };
  //     }
  //     return {
  //       success: true,
  //       message: "User successfully retrieved",
  //       data: user.role === "admin" ? true : false,
  //     };
  //   } catch (error: any) {
  //     return {
  //       success: false,
  //       message: "An Error Occurred",
  //       data: false,
  //     };
  //   }
  // }
}
