import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { TicketFinal } from '../../interfaces/ticket';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent {
  tickets: TicketFinal[] = [];
  // ticket!: TicketFinal;

  constructor(private ticketService: TicketService) {
    this.getReservations();
  }

  getReservations() {
    this.ticketService.getTicketsByUserId().subscribe((response) => {
      if (response.success && response.data) {
        this.tickets = response.data;
        // this.ticket = this.tickets[0];
      }
    });
  }
}
