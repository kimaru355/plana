import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersServices } from '../interfaces/users_service';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api: string = 'http://localhost:3000/user';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
  });

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<Res<User | null>> {
    return this.http.get<Res<User | null>>(`${this.api}/details`, {
      headers: this.headers,
    });
  }
}
