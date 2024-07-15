import { Res } from "./res";
import { UserDetails, UserLogin, UserPasswords, UserRegister } from "./auth";

export interface AuthServices {
  findUser(user_register: UserRegister): Promise<Res<null>>;
  register(
    user_register: UserRegister,
    role: "user" | "organizer" | "admin"
  ): Promise<
    Res<{ token: string; role: "user" | "organizer" | "admin" } | null>
  >;
  login(
    user_login: UserLogin,
    role: "user" | "organizer" | "admin"
  ): Promise<
    Res<{ token: string; role: "user" | "organizer" | "admin" } | null>
  >;
  updateDetails(
    user_details: UserDetails,
    role: "user" | "organizer" | "admin"
  ): Promise<Res<null>>;
  updatePassword(
    user_passwords: UserPasswords,
    role: "user" | "organizer" | "admin"
  ): Promise<Res<null>>;
  verifyOrganizer(organizerId: string): Promise<Res<null>>;
  activateUser(userId: string): Promise<Res<null>>;
  deactivateUser(userId: string): Promise<Res<null>>;
  activateOrganizer(organizerId: string): Promise<Res<null>>;
  deactivateOrganizer(organizerId: string): Promise<Res<null>>;
  activateAdmin(adminId: string): Promise<Res<null>>;
  deactivateAdmin(adminId: string): Promise<Res<null>>;
}
