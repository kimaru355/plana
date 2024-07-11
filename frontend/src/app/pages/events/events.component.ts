import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent {
  events = [
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      country: 'Kenya',
      imagesUrl: ['/images/music1.jpg'],
      price: 6000,
    },
  ];
}
