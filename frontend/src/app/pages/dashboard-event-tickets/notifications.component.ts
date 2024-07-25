import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EventTicket } from '../../interfaces/ticket';
import { EventTicketService } from '../../services/event-ticket.service';
import { ManageEventService } from '../../services/manage-event.service';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  notificationForm: FormGroup;
  eventTicket!: EventTicket;
  eventTickets!: EventTicket[];
  events!: Event[];
  errorMessage: string = '';
  successMessage: string = '';
  showMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventTicketService: EventTicketService,
    private manageEventService: ManageEventService
  ) {
    this.getOrganizerEventTickets();
    this.getOrganizerEvents();
    this.notificationForm = this.fb.group({
      eventId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      price: ['', [Validators.required]],
      persons: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  get eventId() {
    return this.notificationForm.get('eventId');
  }

  get name() {
    return this.notificationForm.get('name');
  }

  get type() {
    return this.notificationForm.get('type');
  }

  get price() {
    return this.notificationForm.get('price');
  }

  get persons() {
    return this.notificationForm.get('persons');
  }

  get quantity() {
    return this.notificationForm.get('quantity');
  }

  getOrganizerEventTickets() {
    this.eventTicketService.getAllEventTickets().subscribe((response) => {
      if (response.success && response.data) {
        this.eventTickets = response.data;
      }
    });
  }

  getOrganizerEvents() {
    this.manageEventService.getAllEvents().subscribe((response) => {
      if (response.success && response.data) {
        this.events = response.data;
      }
    });
  }

  onSubmit() {
    if (this.notificationForm.valid) {
      this.eventTicket = {
        ...this.notificationForm.value,
      };
      this.eventTicket.capacity = this.eventTicket.quantity;
      this.eventTicketService
        .createEventTicket(this.eventTicket)
        .subscribe((response) => {
          if (response.success) {
            this.getOrganizerEventTickets();
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
}
