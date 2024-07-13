import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  categories = [
    {
      id: 1,
      name: 'TECH EVENTS',
      imageUrl: '/images/tech_category.jpg',
    },
    {
      id: 1,
      name: 'MUSIC EVENTS',
      imageUrl: '/images/music_category.jpg',
    },
    {
      id: 1,
      name: 'MOVIE EVENTS',
      imageUrl: '/images/movies_category.jpg',
    },
    {
      id: 1,
      name: 'SPORT EVENTS',
      imageUrl: '/images/sports_category.jpg',
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      imageUrl: '/images/tech_category.jpg',
    },
    {
      id: 1,
      name: 'MUSIC EVENTS',
      imageUrl: '/images/music_category.jpg',
    },
    {
      id: 1,
      name: 'MOVIE EVENTS',
      imageUrl: '/images/movies_category.jpg',
    },
    {
      id: 1,
      name: 'SPORT EVENTS',
      imageUrl: '/images/sports_category.jpg',
    },
  ];
  events = [
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      imagesUrl: ['/images/music1.jpg'],
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      imagesUrl: ['/images/music1.jpg'],
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      imagesUrl: ['/images/music1.jpg'],
    },
    {
      id: 1,
      name: 'TECH EVENTS',
      city: 'Nairobi',
      imagesUrl: ['/images/music1.jpg'],
    },
  ];
}
