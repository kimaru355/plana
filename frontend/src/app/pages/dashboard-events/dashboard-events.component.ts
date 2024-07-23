import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Event } from '../../interfaces/event';
import { ManageEventService } from '../../services/manage-event.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-dashboard-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-events.component.html',
  styleUrl: './dashboard-events.component.css',
})
export class DashboardEventsComponent {
  token: string = localStorage.getItem('token') || '';
  role: 'organizer' | 'admin' =
    (localStorage.getItem('role') as 'organizer' | 'admin') || '';
  events!: Event[];

  constructor(
    private manageEventService: ManageEventService,
    private eventService: EventService
  ) {
    if (this.role === 'organizer') {
      this.getEvents();
    } else if (this.role === 'admin') {
      this.getAllEvents();
    }
  }

  getEvents() {
    this.manageEventService.getAllEvents().subscribe((response) => {
      if (response.success && response.data) {
        this.events = response.data;
      }
    });
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((response) => {
      if (response.success && response.data) {
        this.events = response.data;
      }
    });
  }
}
