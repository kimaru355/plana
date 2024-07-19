import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventFinal } from '../../interfaces/event';

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
  selectedTicketId = 1;
  currentImageUrl = '/images/hosts_hero.jpg';
  selectedTicket = { id: 1, type: 'REGULAR', price: 1000, quantity: 200 };
  numberOfTickets = 1;
  event1 = {
    id: 1,
    name: 'BURNING BOY: THE REVENGE OF THE FALLEN',
    description:
      'The most anticipated movie of the year is here! Maddox Enga is back with a bang! Burning Boy is a TV-MA drama series that ran from 2015 to 2019 and follows Elliot Alderson, a young cybersecurity engineer and vigilante hacker who struggles with social anxiety, dissociative identity disorder, and clinical depression. Elliot works for the cybersecurity company Allsafe during the day, but at night he connects with people by hacking them, which often leads him to act as a cyber-vigilante. When Elliot is recruited by an underground hacker group led by the mysterious insurrectionary anarchist "Mr. Robot" to help bring down corporate America, he must decide whether to resist or take the chance to take down the multinational CEOs he believes are ruining the world.',
    country: 'Kenya',
    city: 'Nairobi',
    date: '17th July 2024',
    time: '4:00 PM',
    address: 'Mlimani City Conference Hall',
    imagesUrl: [
      '/images/hosts_hero.jpg',
      '/images/music1.jpg',
      '/images/movies_category.jpg',
      '/images/event.jpg',
    ],
    host: {
      name: 'Maddox Enga',
      imageUrl: '/images/profile.jpg',
      country: 'Kenya',
    },
    tickets: [
      {
        id: 1,
        type: 'Regular',
        price: 3000,
        quantity: 200,
      },
      {
        id: 2,
        type: 'VIP',
        price: 6000,
        quantity: 100,
      },
      {
        id: 3,
        type: 'Economy',
        price: 1500,
        quantity: 300,
      },
    ],
  };

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventService.getEvent(this.id).subscribe((response) => {
      if (response.success && response.data) {
        this.event = response.data;
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
    }
  }

  onTicketChange() {
    const ticket = this.event1.tickets.find(
      (ticket) => ticket.id === +this.selectedTicketId
    );
    if (ticket) {
      this.selectedTicket = ticket;
    }
  }
}
