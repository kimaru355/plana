import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../interfaces/auth';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isOrganizer: boolean = false;
  role: 'user' | 'organizer' = 'user';
  countries: string[] = CountriesService.getCountries();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {
    this.isOrganizer = this.activateRoute.snapshot.url
      .map((url) => url.path)
      .includes('organizer');
    if (this.isOrganizer) {
      this.role = 'organizer';
    }
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get country() {
    return this.registerForm.get('country');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mismatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user_register: UserRegister = this.registerForm.value;
      user_register.phoneNumber = user_register.phoneNumber.toString();
      delete user_register.confirmPassword;
      this.authService
        .register(user_register, this.role)
        .subscribe((response) => {
          if (!response.success || !response.data) {
            alert(response.message);
            return;
          }
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role);
          if (response.data.role === 'user') {
            this.router.navigate(['events']);
          } else if (response.data.role === 'organizer') {
            this.router.navigate(['/dashboard/analytics']);
          }
        });
    }
  }
}
