import { AdminAnalytic, OrganizerAnalytic } from "./analytic";
import { Res } from "./res";

export interface AnalyticServices {
  getOrganizerAnalytics(
    organizerId: string
  ): Promise<Res<OrganizerAnalytic | null>>;
  getAdminAnalytics(): Promise<Res<AdminAnalytic | null>>;
}
