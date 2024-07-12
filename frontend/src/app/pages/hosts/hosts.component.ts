import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hosts',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './hosts.component.html',
  styleUrl: './hosts.component.css',
})
export class HostsComponent {
  countries = [
    { id: 1, name: 'Kenya' },
    { id: 2, name: 'Uganda' },
    { id: 3, name: 'Tanzania' },
    { id: 4, name: 'Rwanda' },
  ];
  categories = [
    {
      id: 1,
      name: 'TECH',
      imageUrl: '/images/tech_category.jpg',
    },
    {
      id: 1,
      name: 'MUSIC',
      imageUrl: '/images/music_category.jpg',
    },
    {
      id: 1,
      name: 'MOVIE',
      imageUrl: '/images/movies_category.jpg',
    },
    {
      id: 1,
      name: 'SPORT',
      imageUrl: '/images/sports_category.jpg',
    },
    {
      id: 1,
      name: 'TECH',
      imageUrl: '/images/tech_category.jpg',
    },
    {
      id: 1,
      name: 'MUSIC',
      imageUrl: '/images/music_category.jpg',
    },
    {
      id: 1,
      name: 'MOVIE',
      imageUrl: '/images/movies_category.jpg',
    },
    {
      id: 1,
      name: 'SPORT',
      imageUrl: '/images/sports_category.jpg',
    },
  ];
  hosts = [
    {
      id: 1,
      name: 'Maddox',
      country: 'Kenya',
      imageUrl: '/images/profile.jpg',
    },
    {
      id: 1,
      name: 'Maddox',
      country: 'Kenya',
      imageUrl: '/images/profile.jpg',
    },
    {
      id: 1,
      name: 'Maddox',
      country: 'Kenya',
      imageUrl: '/images/profile.jpg',
    },
    {
      id: 1,
      name: 'Maddox',
      country: 'Kenya',
      imageUrl: '/images/profile.jpg',
    },
    {
      id: 1,
      name: 'Maddox',
      country: 'Kenya',
      imageUrl: '/images/profile.jpg',
    },
  ];
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
