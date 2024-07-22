import { Observable } from 'rxjs';
import { AdminAnalytic, OrganizerAnalytic } from './analytic';
import { Res } from './res';

export interface AnalyticServices {
  getOrganizerAnalytics(): Observable<Res<OrganizerAnalytic | null>>;
  getAdminAnalytics(): Observable<Res<AdminAnalytic | null>>;
}
