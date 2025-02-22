import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthServices } from "../interfaces/auth_service";
import {
  UserDetails,
  UserLogin,
  UserPasswords,
  UserRegister,
} from "../interfaces/auth";
import { Res } from "../interfaces/res";
import { User } from "../interfaces/user";

export class AuthService implements AuthServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async findUser(user_register: UserRegister): Promise<Res<null>> {
    try {
      const userUserEmail = await this.prisma.user.findUnique({
        where: {
          email: user_register.email,
        },
      });
      if (userUserEmail) {
        return {
          success: true,
          message: "Email already in use",
          data: null,
        };
      }
      const userUserPhoneNumber = await this.prisma.user.findUnique({
        where: {
          phoneNumber: user_register.phoneNumber,
        },
      });
      if (userUserPhoneNumber) {
        return {
          success: true,
          message: "Phone number already in use",
          data: null,
        };
      }
      const userOrganizerEmail = await this.prisma.organizer.findUnique({
        where: {
          email: user_register.email,
        },
      });
      if (userOrganizerEmail) {
        return {
          success: true,
          message: "Email already in use",
          data: null,
        };
      }
      const userOrganizerPhoneNumber = await this.prisma.organizer.findUnique({
        where: {
          phoneNumber: user_register.phoneNumber,
        },
      });
      if (userOrganizerPhoneNumber) {
        return {
          success: true,
          message: "Phone number already in use",
          data: null,
        };
      }
      const userAdminEmail = await this.prisma.admin.findUnique({
        where: {
          email: user_register.email,
        },
      });
      if (userAdminEmail) {
        return {
          success: true,
          message: "Email already in use",
          data: null,
        };
      }
      const userAdminPhoneNumber = await this.prisma.admin.findUnique({
        where: {
          phoneNumber: user_register.phoneNumber,
        },
      });
      if (userAdminPhoneNumber) {
        return {
          success: true,
          message: "Phone number already in use",
          data: null,
        };
      }
      return {
        success: false,
        message: "User does not exist",
        data: null,
      };
    } catch {
      return {
        success: true,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async register(
    user_register: UserRegister,
    role: "user" | "organizer" | "admin"
  ): Promise<
    Res<{ token: string; role: "user" | "organizer" | "admin" } | null>
  > {
    try {
      const userExists: Res<null> = await this.findUser(user_register);
      if (userExists.success) {
        userExists.success = false;
        return userExists;
      }
      const hashedPassword = bcrypt.hashSync(user_register.password, 10);
      user_register.password = hashedPassword;
      if (role === "user") {
        await this.prisma.user.create({
          data: user_register,
        });
      } else if (role === "organizer") {
        await this.prisma.organizer.create({
          data: user_register,
        });
      } else if (role === "admin") {
        await this.prisma.admin.create({
          data: user_register,
        });
      }
      const token = jwt.sign(
        { id: user_register.id, role },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );
      return {
        success: true,
        message: "Account successfully created",
        data:
          role === "user"
            ? {
                token: token,
                role,
              }
            : null,
      };
    } catch {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async login(
    user_login: UserLogin,
    role: "user" | "organizer" | "admin"
  ): Promise<
    Res<{ token: string; role: "user" | "organizer" | "admin" } | null>
  > {
    try {
      let email: string = "";
      let password: string = "";
      let id: string = "";
      if (role === "user") {
        const user = await this.prisma.user.findUnique({
          where: {
            email: user_login.email,
            isDeactivated: false,
          },
        });
        if (user) {
          email = user.email;
          password = user.password;
          id = user.id;
        }
      } else if (role === "organizer") {
        const user = await this.prisma.organizer.findUnique({
          where: {
            email: user_login.email,
            isDeactivated: false,
          },
        });
        if (user && !user.isVerified) {
          return {
            success: false,
            message:
              "Your Account verification is pending. Contact admin for further assistance.",
            data: null,
          };
        }
        if (user) {
          email = user.email;
          password = user.password;
          id = user.id;
        }
      } else if (role === "admin") {
        const user = await this.prisma.admin.findUnique({
          where: {
            email: user_login.email,
            isDeactivated: false,
          },
        });
        if (user) {
          email = user.email;
          password = user.password;
          id = user.id;
        }
      }
      if (!email || !password) {
        return {
          success: false,
          message: "Invalid email or password",
          data: null,
        };
      }

      const doPasswordsMatch = bcrypt.compareSync(
        user_login.password,
        password
      );
      if (!doPasswordsMatch) {
        return {
          success: false,
          message: "Invalid email or password",
          data: null,
        };
      }
      const token = jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });
      return {
        success: true,
        message: "User successfully logged in",
        data: { token: token, role },
      };
    } catch (error) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async updateDetails(
    user_details: UserDetails,
    role: "user" | "organizer" | "admin"
  ): Promise<Res<null>> {
    try {
      if (role === "user") {
        await this.prisma.user.update({
          where: {
            id: user_details.id,
          },
          data: user_details,
        });
      } else if (role === "organizer") {
        await this.prisma.organizer.update({
          where: {
            id: user_details.id,
          },
          data: user_details,
        });
      } else if (role === "admin") {
        await this.prisma.admin.update({
          where: {
            id: user_details.id,
          },
          data: user_details,
        });
      }
      return {
        success: true,
        message: "Profile successfully updated",
        data: null,
      };
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.message.includes("Unique constraint failed")) {
          return {
            success: false,
            message: "Email or Phone Number already in use",
            data: null,
          };
        }
      }
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async updatePassword(
    user_passwords: UserPasswords,
    role: "user" | "organizer" | "admin"
  ): Promise<Res<null>> {
    try {
      let prevPassword: string = "";
      if (role === "user") {
        const user = await this.prisma.user.findUnique({
          where: {
            id: user_passwords.id,
            isDeactivated: false,
          },
        });
        if (user) {
          prevPassword = user.password;
        }
      } else if (role === "organizer") {
        const user = await this.prisma.organizer.findUnique({
          where: {
            id: user_passwords.id,
            isDeactivated: false,
            isVerified: true,
          },
        });
        if (user) {
          prevPassword = user.password;
        }
      } else if (role === "admin") {
        const user = await this.prisma.admin.findUnique({
          where: {
            id: user_passwords.id,
            isDeactivated: false,
          },
        });
        if (user) {
          prevPassword = user.password;
        }
      }
      if (!prevPassword) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }
      const doPasswordsMatch = bcrypt.compareSync(
        user_passwords.old_password,
        prevPassword
      );
      if (!doPasswordsMatch) {
        return {
          success: false,
          message: "Incorrect password",
          data: null,
        };
      }
      const hashedPassword = bcrypt.hashSync(user_passwords.new_password, 10);
      if (role === "user") {
        await this.prisma.user.update({
          where: {
            id: user_passwords.id,
          },
          data: {
            password: hashedPassword,
          },
        });
      } else if (role === "organizer") {
        await this.prisma.organizer.update({
          where: {
            id: user_passwords.id,
          },
          data: {
            password: hashedPassword,
          },
        });
      } else if (role === "admin") {
        await this.prisma.admin.update({
          where: {
            id: user_passwords.id,
          },
          data: {
            password: hashedPassword,
          },
        });
      }
      return {
        success: true,
        message: "Password successfully updated",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async verifyOrganizer(organizerId: string): Promise<Res<UserDetails | null>> {
    try {
      await this.prisma.organizer.update({
        where: {
          id: organizerId,
        },
        data: {
          isVerified: true,
        },
      });
      const organizer: UserDetails | null =
        await this.prisma.organizer.findUnique({
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            phoneNumber: true,
            country: true,
          },
          where: {
            id: organizerId,
          },
        });
      return {
        success: true,
        message: "Organizer verified",
        data: organizer,
      };
    } catch {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async activateUser(userId: string): Promise<Res<null>> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isDeactivated: false,
        },
      });
      return {
        success: true,
        message: "User activated successfully",
        data: null,
      };
    } catch {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async deactivateUser(userId: string): Promise<Res<null>> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isDeactivated: true,
        },
      });
      return {
        success: true,
        message: "User deactivated successfully",
        data: null,
      };
    } catch {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async activateOrganizer(organizerId: string): Promise<Res<null>> {
    try {
      await this.prisma.organizer.update({
        where: {
          id: organizerId,
        },
        data: {
          isDeactivated: false,
        },
      });
      return {
        success: true,
        message: "Organizer activated successfully",
        data: null,
      };
    } catch {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async deactivateOrganizer(organizerId: string): Promise<Res<null>> {
    try {
      await this.prisma.organizer.update({
        where: {
          id: organizerId,
        },
        data: {
          isDeactivated: true,
        },
      });
      return {
        success: true,
        message: "Organizer deactivated successfully",
        data: null,
      };
    } catch {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async activateAdmin(adminId: string): Promise<Res<null>> {
    try {
      await this.prisma.admin.update({
        where: {
          id: adminId,
        },
        data: {
          isDeactivated: false,
        },
      });
      return {
        success: true,
        message: "Admin activated successfully",
        data: null,
      };
    } catch {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async deactivateAdmin(adminId: string): Promise<Res<null>> {
    try {
      await this.prisma.admin.update({
        where: {
          id: adminId,
        },
        data: {
          isDeactivated: true,
        },
      });
      return {
        success: true,
        message: "Admin deactivated successfully",
        data: null,
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
