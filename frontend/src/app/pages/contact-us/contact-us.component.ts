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
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  contactUsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactUsForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  get name() {
    return this.contactUsForm.get('name');
  }

  get email() {
    return this.contactUsForm.get('email');
  }

  get phoneNumber() {
    return this.contactUsForm.get('phoneNumber');
  }

  get message() {
    return this.contactUsForm.get('message');
  }

  onSubmit() {
    if (this.contactUsForm.valid) {
    }
  }
}
