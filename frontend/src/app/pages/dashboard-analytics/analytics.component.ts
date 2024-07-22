import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ChartComponent } from '../../components/chart/chart.component';
import { AnalyticService } from '../../services/analytic.service';
import { AdminAnalytic, OrganizerAnalytic } from '../../interfaces/analytic';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, ChartComponent, CurrencyPipe],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  role: 'organizer' | 'admin' = localStorage.getItem('role') as
    | 'organizer'
    | 'admin';
  analytics!: OrganizerAnalytic | AdminAnalytic;

  constructor(private analyticService: AnalyticService) {
    if (this.role === 'admin') {
      this.analyticService.getAdminAnalytics().subscribe((response) => {
        if (response.success && response.data) this.analytics = response.data;
      });
    } else {
      this.analyticService.getOrganizerAnalytics().subscribe((response) => {
        if (response.success && response.data) {
          this.analytics = response.data;
        }
      });
    }
  }
}
