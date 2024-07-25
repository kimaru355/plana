import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { EventService } from '../../services/event.service';
import { EventFinal } from '../../interfaces/event';
import { CategoryService } from '../../services/category.service';
import { EventCategory } from '../../interfaces/category';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent {
  countries: string[] = [];
  events: EventFinal[] = [];
  allEvents: EventFinal[] = [];
  categories: EventCategory[] = [];
  categoryId: string = '';
  country: string = '';

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService
  ) {
    this.getAllEvents();
    this.getAllCategories();
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((response) => {
      if (!response.success || !response.data) {
        return;
      }
      this.events = response.data;
      this.allEvents = response.data;
      this.countries = this.events.map((event) => event.country);
    });
  }

  getAllCategories() {
    this.categoryService.getAllEventCategories().subscribe((response) => {
      if (!response.success || !response.data) {
        return;
      }
      this.categories = response.data;
    });
  }

  filterByCategory() {
    this.events = this.allEvents.filter(
      (event) => event.categoryId == this.categoryId
    );
  }
}
