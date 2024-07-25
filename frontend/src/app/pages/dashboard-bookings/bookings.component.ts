import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { TicketFinal } from '../../interfaces/ticket';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  bookings!: TicketFinal[];
  role: 'organizer' | 'admin' = localStorage.getItem('role') as
    | 'organizer'
    | 'admin';
  constructor(private ticketService: TicketService) {
    if (this.role === 'organizer') {
      this.getOrganizerTickets();
    } else if (this.role === 'admin') {
      this.getAllTickets();
    }
  }

  getOrganizerTickets() {
    this.ticketService.getTicketsByOrganizerId().subscribe((response) => {
      if (response.success && response.data) {
        this.bookings = response.data;
        console.log(this.bookings);
      }
    });
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe((response) => {
      if (response.success && response.data) {
        this.bookings = response.data;
      }
    });
  }
}
