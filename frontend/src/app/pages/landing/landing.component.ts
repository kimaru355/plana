import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Event } from '../../interfaces/event';
import { EventCategory } from '../../interfaces/category';
import { EventService } from '../../services/event.service';
import { CategoryService } from '../../services/category.service';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, AboutUsComponent, ContactUsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  events!: Event[];
  categories!: EventCategory[];
  constructor(
    private eventService: EventService,
    private categoryService: CategoryService
  ) {
    this.getEvents();
    this.getCategories();
  }

  getEvents() {
    this.eventService.getAllEvents().subscribe((response) => {
      if (response.success && response.data) {
        this.events = response.data;
        if (this.events.length > 4) {
          this.events.splice(4);
        }
      }
    });
  }

  getCategories() {
    this.categoryService.getAllEventCategories().subscribe((response) => {
      if (response.success && response.data) {
        this.categories = response.data;
      }
    });
  }
}
