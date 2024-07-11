import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  analytics = {
    totalTickets: 300000,
    totalEvents: 300000,
    totalSales: 6750000,
    totalClients: 80000,
    mostBookedEvents: [
      {
        eventName: 'TECH EVENTS',
        imagesUrl: ['/images/music1.jpg'],
        capacity: 1000,
        quantity: 200,
      },
    ],
    recentBookings: [
      {
        eventName: 'TECH EVENTS',
        customerName: 'The Blockbuster',
        bookingDate: new Date().toISOString().split('T')[0],
      },
      {
        eventName: 'TECH EVENTS',
        customerName: 'The Blockbuster',
        bookingDate: new Date().toISOString().split('T')[0],
      },
      {
        eventName: 'TECH EVENTS',
        customerName: 'The Blockbuster',
        bookingDate: new Date().toISOString().split('T')[0],
      },
      {
        eventName: 'TECH EVENTS',
        customerName: 'The Blockbuster',
        bookingDate: new Date().toISOString().split('T')[0],
      },
      {
        eventName: 'TECH EVENTS',
        customerName: 'The Blockbuster',
        bookingDate: new Date().toISOString().split('T')[0],
      },
    ],
  };
}
