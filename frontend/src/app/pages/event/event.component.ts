import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventFinal } from '../../interfaces/event';
import { EventTicket, Ticket } from '../../interfaces/ticket';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent {
  id: string = this.activatedRoute.snapshot.params['id'] || '';
  event!: EventFinal;
  token: string = localStorage.getItem('token') || '';
  selectedTicketId!: string;
  currentImageUrl!: string;
  selectedTicket!: EventTicket;
  numberOfTickets = 1;
  inputName: string = '';
  names: string[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  showMessage: boolean = false;

  constructor(
    private eventService: EventService,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventService.getEvent(this.id).subscribe((response) => {
      if (response.success && response.data) {
        this.event = response.data;
        if (this.event.images.length !== 4) {
          for (let i = 0; i <= 4 - this.event.images.length; i++) {
            this.event.images.push(this.currentImageUrl);
          }
        }
        this.currentImageUrl = this.event.images[0];
        this.selectedTicketId = this.event.eventTickets[0].id;
        this.selectedTicket = this.event.eventTickets[0];
      }
    });
  }

  increment() {
    if (this.numberOfTickets < this.selectedTicket.quantity) {
      this.numberOfTickets++;
    }
  }

  decrement() {
    if (this.numberOfTickets > 1) {
      this.numberOfTickets--;
      if (
        this.names.length >
        this.numberOfTickets * this.selectedTicket.persons
      ) {
        this.names = this.names.slice(
          0,
          this.numberOfTickets * this.selectedTicket.persons
        );
      }
    }
  }

  onTicketChange() {
    const ticket = this.event.eventTickets.find(
      (ticket) => ticket.id === this.selectedTicketId
    );
    if (ticket) {
      this.selectedTicket = ticket;
    }
  }

  addName() {
    if (!this.inputName) {
      this.errorMessage = 'Please enter a name';
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.errorMessage = '';
        this.successMessage = '';
      }, 2000);
      return;
    }
    if (this.inputName.split(' ').length < 2) {
      this.errorMessage = 'Please provide the full name';
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.errorMessage = '';
        this.successMessage = '';
      }, 2000);
      return;
    }
    if (
      this.names.length >=
      this.numberOfTickets * this.selectedTicket.persons
    ) {
      this.errorMessage = 'You have reached the maximum number of names';
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.errorMessage = '';
        this.successMessage = '';
      }, 2000);
      return;
    }
    this.names.push(this.inputName);
    this.inputName = '';
  }

  bookTicket() {
    if (!this.token) {
      this.router.navigate(['/login']);
      return;
    }
    if (
      this.names.length <
      this.numberOfTickets * this.selectedTicket.persons
    ) {
      this.errorMessage = 'Please provide all the names';
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.errorMessage = '';
        this.successMessage = '';
      }, 2000);
      return;
    }
    const confirmed = confirm(
      `Book ${this.numberOfTickets} ticket(s) for ${this.event.title} at ${
        this.selectedTicket.price * this.numberOfTickets
      }?`
    );
    if (!confirmed) {
      return;
    }
    const ticket: Ticket = {
      id: this.selectedTicket.id,
      names: this.names,
      quantity: this.numberOfTickets,
      eventTicketId: this.selectedTicket.id,
      eventId: this.event.id,
    };
    this.ticketService.createTicket(ticket).subscribe((response) => {
      if (response.success) {
        this.successMessage = response.message;
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
          this.errorMessage = '';
          this.successMessage = '';
          this.router.navigate(['/reservations']);
        }, 2000);
      } else {
        this.errorMessage = response.message;
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
          this.errorMessage = '';
          this.successMessage = '';
        }, 2000);
      }
    });
  }
}
