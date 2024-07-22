import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnalyticServices } from '../interfaces/analytic_service';
import { AdminAnalytic, OrganizerAnalytic } from '../interfaces/analytic';
import { Res } from '../interfaces/res';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticService implements AnalyticServices {
  private api: string = 'http://localhost:3000/analytics';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
  });

  constructor(private http: HttpClient) {}

  getOrganizerAnalytics(): Observable<Res<OrganizerAnalytic | null>> {
    return this.http.get<Res<OrganizerAnalytic | null>>(
      `${this.api}/organizer`,
      {
        headers: this.headers,
      }
    );
  }

  getAdminAnalytics(): Observable<Res<AdminAnalytic | null>> {
    return this.http.get<Res<AdminAnalytic | null>>(`${this.api}/admin`, {
      headers: this.headers,
    });
  }
}
