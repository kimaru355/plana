import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.url.map((url) => url.path);
    if (params.includes('edit')) {
      this.isEditing = true;
      this.eventForm = this.fb.group({
        title: ['The Reacher', Validators.required],
        description: [
          'Soldier betrayed by corrupt comrades',
          Validators.required,
        ],
        date: ['2022-07-12', Validators.required],
        time: ['19:00', Validators.required],
        country: ['Kenya', Validators.required],
        city: ['Nairobi', Validators.required],
        address: ['Mlimani', Validators.required],
        capacity: ['400', Validators.required],
        image: ['', Validators.required],
        categoryId: ['1', Validators.required],
      });
    } else {
      this.eventForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
        time: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
        capacity: ['', Validators.required],
        image: ['', Validators.required],
        categoryId: ['', Validators.required],
      });
    }
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

  get address() {
    return this.eventForm.get('address');
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

  onSubmit() {
    if (this.eventForm.valid) {
    }
  }
}
