import { Component } from '@angular/core';
import { UserDetails } from '../../interfaces/auth';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userDetails!: UserDetails;
  role: 'user' | 'organizer' | 'admin' =
    (localStorage.getItem('role') as 'user' | 'organizer' | 'admin') || 'user';
  countries: string[] = CountriesService.getCountries();
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.getUserDetails();
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
          alert('User details updated successfully');
        }
      });
  }
  updatePassword() {}
}
