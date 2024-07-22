import { Observable } from 'rxjs';
import { Res } from './res';
import { User } from './user';
import { UserDetails } from './auth';

export interface UsersServices {
  getUsers(): Observable<Res<User[] | null>>;
  getOrganizers(): Observable<Res<User[] | null>>;
  getAdmins(): Observable<Res<User[] | null>>;
  getUser(id: string): Observable<Res<User | null>>;
  getClients(organizerId: string): Observable<Res<UserDetails[] | null>>;
}
