import { Injectable } from '@angular/core';
import { AuthServices } from '../interfaces/auth_service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  UserDetails,
  UserLogin,
  UserPasswords,
  UserRegister,
} from '../interfaces/auth';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthServices {
  private api: string = 'http://localhost:3000/auth';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
  });

  constructor(private http: HttpClient) {}

  register(
    user_register: UserRegister,
    role: 'user' | 'organizer' | 'admin'
  ): Observable<
    Res<{ role: 'user' | 'organizer' | 'admin'; token: string } | null>
  > {
    return this.http.post<
      Res<{ role: 'user' | 'organizer' | 'admin'; token: string } | null>
    >(`${this.api}/register/${role}`, user_register);
  }

  login(
    user_login: UserLogin,
    role: 'user' | 'organizer' | 'admin'
  ): Observable<
    Res<{ role: 'user' | 'organizer' | 'admin'; token: string } | null>
  > {
    return this.http.post<
      Res<{ role: 'user' | 'organizer' | 'admin'; token: string } | null>
    >(`${this.api}/login/${role}`, user_login);
  }

  updateDetails(
    user_details: UserDetails,
    role: 'user' | 'organizer' | 'admin'
  ): Observable<Res<null>> {
    return this.http.put<Res<null>>(
      `${this.api}/update_details/${role}`,
      user_details,
      {
        headers: this.headers,
      }
    );
  }

  updatePassword(
    user_passwords: UserPasswords,
    role: 'user' | 'organizer' | 'admin'
  ): Observable<Res<null>> {
    return this.http.put<Res<null>>(
      `${this.api}/update_password/${role}`,
      user_passwords,
      {
        headers: this.headers,
      }
    );
  }

  verifyOrganizer(organizerId: string): Observable<Res<null>> {
    return this.http.put<Res<null>>(
      `${this.api}/verify/${organizerId}`,
      { headers: this.headers },
      {
        headers: this.headers,
      }
    );
  }
  activateUser(userId: string): Observable<Res<null>> {
    return this.http.put<Res<null>>(
      `${this.api}/activate/user/${userId}`,
      { headers: this.headers },
      {
        headers: this.headers,
      }
    );
  }
  deactivateUser(userId: string): Observable<Res<null>> {
    return this.http.put<Res<null>>(
      `${this.api}/deactivate/user/${userId}`,
      { headers: this.headers },
      {
        headers: this.headers,
      }
    );
  }
  activateOrganizer(organizerId: string): Observable<Res<null>> {
    return this.http.put<Res<null>>(
      `${this.api}/activate/organizer/${organizerId}`,
      { headers: this.headers },
      {
        headers: this.headers,
      }
    );
  }
  deactivateOrganizer(organizerId: string): Observable<Res<null>> {
    return this.http.put<Res<null>>(
      `${this.api}/deactivate/organizer/${organizerId}`,
      { headers: this.headers },
      {
        headers: this.headers,
      }
    );
  }
  activateAdmin(adminId: string): Observable<Res<null>> {
    return this.http.put<Res<null>>(
      `${this.api}/activate/admin/${adminId}`,
      { headers: this.headers },
      {
        headers: this.headers,
      }
    );
  }
  deactivateAdmin(adminId: string): Observable<Res<null>> {
    return this.http.put<Res<null>>(
      `${this.api}/deactivate/admin/${adminId}`,
      { headers: this.headers },
      {
        headers: this.headers,
      }
    );
  }
}
