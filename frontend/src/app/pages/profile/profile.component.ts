import { Component } from '@angular/core';
import { UserDetails, UserPasswords } from '../../interfaces/auth';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { AuthService } from '../../services/auth.service';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userDetails!: UserDetails;
  passwordForm!: FormGroup;
  userPasswords!: UserPasswords;
  role: 'user' | 'organizer' | 'admin' =
    (localStorage.getItem('role') as 'user' | 'organizer' | 'admin') || 'user';
  countries: string[] = CountriesService.getCountries();
  errorMessage: string = '';
  successMessage: string = '';
  showMessage: boolean = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.getUserDetails();
    this.passwordForm = this.fb.group(
      {
        old_password: ['', [Validators.required]],
        new_password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('new_password')!.value ===
      form.get('confirm_password')!.value
      ? null
      : { mismatch: true };
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe((response) => {
      if (response.success && response.data) {
        this.userDetails = response.data;
      }
    });
  }

  updateUserDetails() {
    this.authService
      .updateDetails(this.userDetails, this.role)
      .subscribe((response) => {
        if (response.success) {
          this.successMessage = response.message;
        } else {
          this.errorMessage = response.message;
        }
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
          this.errorMessage = '';
          this.successMessage = '';
        }, 2000);
      });
  }
  updatePassword() {
    this.userPasswords = this.passwordForm.value;
    if (
      !this.userPasswords.new_password ||
      !this.userPasswords.old_password ||
      this.userPasswords.new_password !== this.userPasswords.confirm_password
    ) {
      return;
    }
    this.authService
      .updatePassword(this.userPasswords, this.role)
      .subscribe((response) => {
        if (response.success) {
          this.successMessage = response.message;
        } else {
          this.errorMessage = response.message;
        }
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
          this.errorMessage = '';
          this.successMessage = '';
        }, 2000);
      });
  }
}
