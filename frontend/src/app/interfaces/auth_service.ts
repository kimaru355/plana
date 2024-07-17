import { Res } from './res';
import { UserDetails, UserLogin, UserPasswords, UserRegister } from './auth';
import { Observable } from 'rxjs';

export interface AuthServices {
  register(
    user_register: UserRegister,
    role: 'user' | 'organizer' | 'admin'
  ): Observable<
    Res<{ token: string; role: 'user' | 'organizer' | 'admin' } | null>
  >;
  login(
    user_login: UserLogin,
    role: 'user' | 'organizer' | 'admin'
  ): Observable<
    Res<{ token: string; role: 'user' | 'organizer' | 'admin' } | null>
  >;
  updateDetails(
    user_details: UserDetails,
    role: 'user' | 'organizer' | 'admin'
  ): Observable<Res<null>>;
  updatePassword(
    user_passwords: UserPasswords,
    role: 'user' | 'organizer' | 'admin'
  ): Observable<Res<null>>;
  verifyOrganizer(organizerId: string): Observable<Res<null>>;
  activateUser(userId: string): Observable<Res<null>>;
  deactivateUser(userId: string): Observable<Res<null>>;
  activateOrganizer(organizerId: string): Observable<Res<null>>;
  deactivateOrganizer(organizerId: string): Observable<Res<null>>;
  activateAdmin(adminId: string): Observable<Res<null>>;
  deactivateAdmin(adminId: string): Observable<Res<null>>;
}
