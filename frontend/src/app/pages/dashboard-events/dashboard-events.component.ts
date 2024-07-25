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
  errorMessage: string = '';
  successMessage: string = '';
  showMessage: boolean = false;
  showConfirmation: boolean = false;
  isConfirmed = false;
  eventId!: string;

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

  showConfirmDialog(eventId: string) {
    this.eventId = eventId;
    this.showConfirmation = true;
  }

  confirmDialog(status: boolean) {
    if (!status) {
      this.isConfirmed = false;
      this.showConfirmation = false;
      this.eventId = '';
      return;
    }
    this.showConfirmation = false;
    this.deleteEvent(this.eventId);
  }

  deleteEvent(eventId: string) {
    this.manageEventService.deleteEvent(eventId).subscribe((response) => {
      if (response.success) {
        this.getEvents();
        this.successMessage = response.message;
      } else {
        this.errorMessage = response.message;
      }
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.errorMessage = '';
        this.successMessage = '';
      }, 2000);
    });
  }
}
