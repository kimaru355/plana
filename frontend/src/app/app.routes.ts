import { Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventComponent } from './pages/event/event.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AnalyticsComponent } from './pages/dashboard-analytics/analytics.component';
import { DashboardEventsComponent } from './pages/dashboard-events/dashboard-events.component';
import { ClientsComponent } from './pages/dashboard-clients/clients.component';
import { BookingsComponent } from './pages/dashboard-bookings/bookings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HostsComponent } from './pages/hosts/hosts.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { NotificationsComponent } from './pages/dashboard-notifications/notifications.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { DashboardHostsComponent } from './pages/dashboard-hosts/dashboard-hosts.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'login/organizer',
    component: LoginComponent,
  },
  { path: 'register/organizer', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'events', component: EventsComponent },
      { path: 'hosts', component: HostsComponent },
      { path: 'event/:id', component: EventComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'reservations', component: ReservationsComponent },
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
      { path: 'event/create', component: CreateEventComponent },
      { path: 'event/edit/:id', component: CreateEventComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'hosts', component: DashboardHostsComponent },
    ],
  },
];
