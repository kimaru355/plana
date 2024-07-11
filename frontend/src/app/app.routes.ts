import { Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventComponent } from './pages/event/event.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { DashboardEventsComponent } from './pages/dashboard-events/dashboard-events.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'events', component: EventsComponent },
      { path: 'event', component: EventComponent },
    ],
  },
  {
    path: 'dashboard',
    component: AdminHomeComponent,
    children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'events', component: DashboardEventsComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];
