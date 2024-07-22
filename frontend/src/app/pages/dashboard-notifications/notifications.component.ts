import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  notificationForm: FormGroup;
  notifications = [
    {
      eventName: 'TECH EVENTS',
      subject: 'No pets allowed',
      message: 'No pets allowed. Thank you for your understanding',
      bookingDate: new Date().toISOString().split('T')[0],
    },
    {
      eventName: 'TECH EVENTS',
      subject: 'No pets allowed',
      message: 'No pets allowed. Thank you for your understanding',
      bookingDate: new Date().toISOString().split('T')[0],
    },
    {
      eventName: 'TECH EVENTS',
      subject: 'No pets allowed',
      message: 'No pets allowed. Thank you for your understanding',
      bookingDate: new Date().toISOString().split('T')[0],
    },
    {
      eventName: 'TECH EVENTS',
      subject: 'No pets allowed',
      message: 'No pets allowed. Thank you for your understanding',
      bookingDate: new Date().toISOString().split('T')[0],
    },
    {
      eventName: 'TECH EVENTS',
      subject: 'No pets allowed',
      message: 'No pets allowed. Thank you for your understanding',
      bookingDate: new Date().toISOString().split('T')[0],
    },
    {
      eventName: 'TECH EVENTS',
      subject: 'No pets allowed',
      message: 'No pets allowed. Thank you for your understanding',
      bookingDate: new Date().toISOString().split('T')[0],
    },
    {
      eventName: 'TECH EVENTS',
      subject: 'No pets allowed',
      message: 'No pets allowed. Thank you for your understanding',
      bookingDate: new Date().toISOString().split('T')[0],
    },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.notificationForm = this.fb.group({
      categoryId: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', Validators.required],
    });
  }

  get categoryId() {
    return this.notificationForm.get('categoryId');
  }

  get subject() {
    return this.notificationForm.get('subject');
  }

  get message() {
    return this.notificationForm.get('message');
  }

  onSubmit() {
    if (this.notificationForm.valid) {
    }
  }
}
