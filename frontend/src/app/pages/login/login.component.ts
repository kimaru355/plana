import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.get('email')?.value === 'organizer@mail.com') {
        localStorage.setItem('token', 'organizer');
        this.router.navigate(['dashboard']);
      } else if (this.loginForm.get('email')?.value === 'admin@mail.com') {
        localStorage.setItem('token', 'admin');
        this.router.navigate(['dashboard']);
      } else if (this.loginForm.get('email')?.value === 'user@mail.com') {
        localStorage.setItem('token', 'user');
        this.router.navigate(['events']);
      }
    }
  }
}
