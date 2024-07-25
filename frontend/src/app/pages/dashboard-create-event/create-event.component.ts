import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CountriesService } from '../../services/countries.service';
import { Event as EventCreate } from '../../interfaces/event';
import { EventCategory } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ManageEventService } from '../../services/manage-event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  isEditing = false;
  isUploading: boolean = false;
  countries: string[] = CountriesService.getCountries();
  categories!: EventCategory[];
  id!: string;
  event!: EventCreate;
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private manageEventService: ManageEventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      location: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      images: [[]],
      categoryId: ['', Validators.required],
    });
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
        const tmpEvent = this.reverseEventCreate(this.event);
        this.eventForm.patchValue(tmpEvent);
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

  onSubmit() {
    if (this.eventForm.valid) {
      const eventCreate: EventCreate = this.prepareEventCreate();
      if (eventCreate.images.length !== 4) {
        return;
      }
      if (!this.isEditing) {
        this.manageEventService
          .createEvent(eventCreate)
          .subscribe((response) => {
            if (response.success && response.data) {
              this.eventForm.reset();
              setTimeout(() => {
                this.router.navigate(['/dashboard/eventTicket']);
              }, 3000);
            }
            alert(response.message);
          });
      } else {
        this.manageEventService
          .updateEvent(eventCreate)
          .subscribe((response) => {
            if (response.success && response.data) {
              this.eventForm.reset();
              setTimeout(() => {
                this.router.navigate(['/dashboard/eventTicket']);
              }, 3000);
            }
            alert(response.message);
          });
      }
    }
  }

  prepareEventCreate() {
    const formValues = this.eventForm.value;
    const startDate = new Date(
      formValues.startDate + 'T' + formValues.startTime
    ).toISOString();
    const endDate = new Date(
      formValues.endDate + 'T' + formValues.endTime
    ).toISOString();

    return {
      ...formValues,
      startDate,
      endDate,
    };
  }

  reverseEventCreate(event: EventCreate) {
    const tmpStartTime = new Date(event.startTime);
    const startDate = `${tmpStartTime.getFullYear()}-${
      tmpStartTime.getMonth() + 1 < 10
        ? '0' + (tmpStartTime.getMonth() + 1)
        : tmpStartTime.getMonth() + 1
    }-${
      tmpStartTime.getDate() < 10
        ? '0' + tmpStartTime.getDate()
        : tmpStartTime.getDate()
    }`;
    const startTime = `${
      tmpStartTime.getHours() < 10
        ? '0' + tmpStartTime.getHours()
        : tmpStartTime.getHours()
    }:${
      tmpStartTime.getMinutes() < 10
        ? '0' + tmpStartTime.getMinutes()
        : tmpStartTime.getMinutes()
    }`;
    const tmpEndTime = new Date(event.startTime);
    const endDate = `${tmpEndTime.getFullYear()}-${
      tmpEndTime.getMonth() + 1 < 10
        ? '0' + (tmpEndTime.getMonth() + 1)
        : tmpEndTime.getMonth() + 1
    }-${tmpEndTime.getDate()}`;
    const endTime = `${
      tmpEndTime.getHours() < 10
        ? '0' + tmpEndTime.getHours()
        : tmpEndTime.getHours()
    }:${
      tmpEndTime.getMinutes() < 10
        ? '0' + tmpEndTime.getMinutes()
        : tmpEndTime.getMinutes()
    }`;
    return {
      ...event,
      startDate,
      startTime,
      endDate,
      endTime,
    };
  }

  async uploadFiles(event: Event): Promise<void> {
    this.isUploading = true;
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
        this.eventForm.get('images')!.value.push(data.url); // Update the images array in the form
        this.isUploading = false;
      }
    }
  }
}
