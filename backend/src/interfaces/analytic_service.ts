import { Analytic } from "./analytic";
import { Res } from "./res";

export interface AnalyticServices {
  getAnalytics(): Promise<Res<Analytic | null>>;
}
