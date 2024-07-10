import { Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'events', component: EventsComponent },
    ],
  },
];
