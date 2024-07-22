import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CountriesService } from '../../services/countries.service';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  eventForm: FormGroup;
  isEditing = false;
  countries: string[] = CountriesService.getCountries();
  id!: string;
  event!: Event;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.getEvent();
        this.isEditing = true;
      }
    });
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      location: ['', Validators.required],
      capacity: ['', Validators.required],
      image: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  get title() {
    return this.eventForm.get('name');
  }

  get description() {
    return this.eventForm.get('description');
  }

  get date() {
    return this.eventForm.get('date');
  }

  get time() {
    return this.eventForm.get('time');
  }

  get country() {
    return this.eventForm.get('country');
  }

  get city() {
    return this.eventForm.get('city');
  }

  get location() {
    return this.eventForm.get('location');
  }

  get capacity() {
    return this.eventForm.get('capacity');
  }

  get image() {
    return this.eventForm.get('image');
  }

  get categoryId() {
    return this.eventForm.get('categoryId');
  }

  getEvent() {
    this.eventService.getEvent(this.id).subscribe((response) => {
      if (response.success && response.data) {
        this.event = response.data;
        this.eventForm.patchValue(response.data);
      }
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
    }
  }
}
