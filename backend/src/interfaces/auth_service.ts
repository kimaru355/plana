import { Res } from "./res";
import { UserDetails, UserLogin, UserPasswords, UserRegister } from "./auth";

export interface AuthServices {
  findUser(user_register: UserRegister): Promise<Res<null>>;
  register(
    user_register: UserRegister,
    role: "user" | "organizer" | "admin"
  ): Promise<Res<{ token: string } | null>>;
  login(
    user_login: UserLogin,
    role: "user" | "organizer" | "admin"
  ): Promise<Res<{ token: string } | null>>;
  updateDetails(
    user_details: UserDetails,
    role: "user" | "organizer" | "admin"
  ): Promise<Res<null>>;
  updatePassword(
    user_passwords: UserPasswords,
    role: "user" | "organizer" | "admin"
  ): Promise<Res<null>>;
}
