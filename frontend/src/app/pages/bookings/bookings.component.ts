import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  bookings = [
    {
      ticketName: 'VIP',
      price: 6000,
      eventName: 'TECH EVENTS',
      clientName: 'John Doe',
      clientEmail: 'johndoe@gmail.com',
      createdAt: new Date().toISOString().split('T')[0],
    },
    {
      ticketName: 'REGULAR',
      price: 6000,
      eventName: 'TECH EVENTS',
      clientName: 'John Doe',
      clientEmail: 'johndoe@gmail.com',
      createdAt: new Date().toISOString().split('T')[0],
    },
    {
      ticketName: 'VIP',
      price: 6000,
      eventName: 'TECH EVENTS',
      clientName: 'John Doe',
      clientEmail: 'johndoe@gmail.com',
      createdAt: new Date().toISOString().split('T')[0],
    },
    {
      ticketName: 'VIP',
      price: 6000,
      eventName: 'TECH EVENTS',
      clientName: 'John Doe',
      clientEmail: 'johndoe@gmail.com',
      createdAt: new Date().toISOString().split('T')[0],
    },
    {
      ticketName: 'VIP',
      price: 6000,
      eventName: 'TECH EVENTS',
      clientName: 'John Doe',
      clientEmail: 'johndoe@gmail.com',
      createdAt: new Date().toISOString().split('T')[0],
    },
  ];
}
