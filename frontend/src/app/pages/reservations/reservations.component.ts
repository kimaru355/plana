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
  reservations = [
    {
      id: 1,
      eventName: 'Sauti Sol Back to Earth',
      startDate: '12 Aug 2024',
      time: '4:00 pm',
      tickets: 4,
      price: 1000,
      imageUrl: '/images/reservation.jpg',
    },
    {
      id: 2,
      eventName: 'Black Patheon 2',
      startDate: '12 Aug 2024',
      time: '4:00 pm',
      tickets: 2,
      price: 1000,
      imageUrl: '/images/reservation.jpg',
    },
  ];

  constructor(private ticketService: TicketService) {
    this.getReservations();
  }

  getReservations() {
    this.ticketService.getTicketsByUserId().subscribe((response) => {
      if (response.success && response.data) {
        this.tickets = response.data;
      }
    });
  }
}
