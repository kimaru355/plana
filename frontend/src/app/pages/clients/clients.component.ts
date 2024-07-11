import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {
  clients = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '0712345678',
      imageUrl: '/images/music1.jpg',
      country: 'Kenya',
    },
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '0712345678',
      imageUrl: '/images/music1.jpg',
      country: 'Kenya',
    },
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '0712345678',
      imageUrl: '/images/music1.jpg',
      country: 'Kenya',
    },
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '0712345678',
      imageUrl: '/images/music1.jpg',
      country: 'Kenya',
    },
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '0712345678',
      imageUrl: '/images/music1.jpg',
      country: 'Kenya',
    },
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '0712345678',
      imageUrl: '/images/music1.jpg',
      country: 'Kenya',
    },
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '0712345678',
      imageUrl: '/images/music1.jpg',
      country: 'Kenya',
    },
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '0712345678',
      imageUrl: '/images/music1.jpg',
      country: 'Kenya',
    },
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '0712345678',
      imageUrl: '/images/music1.jpg',
      country: 'Kenya',
    },
  ];
}
