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
  eventTickets!: EventTicket[];
  events!: Event[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventTicketService: EventTicketService,
    private manageEventService: ManageEventService
  ) {
    this.getOrganizerEventTickets();
    this.notificationForm = this.fb.group({
      categoryId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      price: ['', [Validators.required]],
      persons: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  get categoryId() {
    return this.notificationForm.get('categoryId');
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
    }
  }
}
