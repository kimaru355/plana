import { UserDetails } from "./auth";
import { Res } from "./res";
import { User } from "./user";

export interface UsersServices {
  getUsers(): Promise<Res<User[] | null>>;
  getOrganizers(): Promise<Res<User[] | null>>;
  getAdmins(): Promise<Res<User[] | null>>;
  getUser(id: string): Promise<Res<User | null>>;
  getClients(organizerId: string): Promise<Res<UserDetails[] | null>>;
}
