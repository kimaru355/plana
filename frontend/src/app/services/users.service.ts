import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersServices } from '../interfaces/users_service';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';
import { User } from '../interfaces/user';
import { UserDetails } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements UsersServices {
  private api: string = 'http://localhost:3000/users';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
  });

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<Res<User | null>> {
    return this.http.get<Res<User | null>>(`${this.api}/${id}`, {
      headers: this.headers,
    });
  }

  getUsers(): Observable<Res<User[] | null>> {
    return this.http.get<Res<User[] | null>>(`${this.api}/all`, {
      headers: this.headers,
    });
  }

  isAdmin(id: string): Observable<Res<boolean>> {
    return this.http.get<Res<boolean>>(`${this.api}/admin/${id}`, {
      headers: this.headers,
    });
  }

  getOrganizers(): Observable<Res<User[] | null>> {
    return this.http.get<Res<User[] | null>>(`${this.api}/admin`, {
      headers: this.headers,
    });
  }
  getAdmins(): Observable<Res<User[] | null>> {
    return this.http.get<Res<User[] | null>>(`${this.api}/admin`, {
      headers: this.headers,
    });
  }
  getClients(): Observable<Res<UserDetails[] | null>> {
    return this.http.get<Res<UserDetails[] | null>>(`${this.api}/admin`, {
      headers: this.headers,
    });
  }
}
