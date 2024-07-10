import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  categories = [
    {
      id: 1,
      name: 'TECH EVENTS',
      imageUrl: '/tech_category.jpg',
    },
    {
      id: 1,
      name: 'MUSIC EVENTS',
      imageUrl: '/music_category.jpg',
    },
    {
      id: 1,
      name: 'MOVIE EVENTS',
      imageUrl: '/movies_category.jpg',
    },
    {
      id: 1,
      name: 'SPORT EVENTS',
      imageUrl: '/sports_category.jpg',
    },
  ];
  events = [
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      imagesUrl: ['/music1.jpg'],
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      imagesUrl: ['/music1.jpg'],
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      imagesUrl: ['/music1.jpg'],
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      imagesUrl: ['/music1.jpg'],
    },
  ];
}
