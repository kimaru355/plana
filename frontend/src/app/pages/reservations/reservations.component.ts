import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Reservation {
  id: number;
  eventName: string;
  startDate: string;
  time: string;
  tickets: number;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent {
  reservations: Reservation[] = [
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

  cancelReservation(id: number) {
    console.log(`Cancelling reservation with id: ${id}`);
  }
}
