import { Component } from '@angular/core';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent {
  event = {
    id: 1,
    name: 'TECH EVENTS',
    city: 'Nairobi',
    country: 'Kenya',
    imagesUrl: ['/images/music1.jpg'],
    price: 6000,
  };
}
