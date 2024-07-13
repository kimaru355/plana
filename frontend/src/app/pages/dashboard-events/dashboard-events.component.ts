import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-events.component.html',
  styleUrl: './dashboard-events.component.css',
})
export class DashboardEventsComponent {
  token: string = localStorage.getItem('token') || '';
  events = [
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
    {
      id: 1,
      category: 'tech',
      title: 'TECH EVENTS',
      date: '2021-09-01 4:00 PM',
      capacity: 1000,
      imagesUrl: ['/images/music1.jpg'],
      country: 'Kenya',
    },
  ];
}
