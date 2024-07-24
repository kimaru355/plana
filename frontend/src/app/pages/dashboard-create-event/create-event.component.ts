import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CountriesService } from '../../services/countries.service';
import { Event as EventCreate } from '../../interfaces/event';
import { FormsModule } from '@angular/forms';
import { EventCategory } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  isEditing = false;
  countries: string[] = CountriesService.getCountries();
  categories!: EventCategory[];
  id!: string;
  event!: EventCreate;
  eventCreate = {
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    country: '',
    city: '',
    location: '',
    capacity: '',
    images: [],
    categoryId: '',
  };

  constructor(
    private router: Router,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.getCategories();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.getEvent();
        this.isEditing = true;
      }
    });
  }
  getEvent() {
    this.eventService.getEvent(this.id).subscribe((response) => {
      if (response.success && response.data) {
        this.event = response.data;
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

  onSubmit() {}

  async uploadFiles(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files); // Convert FileList to an array
      const urls: string[] = [];
      for (const file of fileArray) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'shoppie');
        formData.append('cloud_name', 'dr0qq0taf');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dr0qq0taf/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        urls.push(data.url);
        this.event.images.push(data.url); // Set the imageUrl to display the uploaded image
      }
    }
  }
}
