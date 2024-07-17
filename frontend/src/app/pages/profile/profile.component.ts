import { Component } from '@angular/core';
import { UserDetails } from '../../interfaces/auth';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userDetails!: UserDetails;
  countries: string[] = CountriesService.getCountries();
  constructor(private userService: UserService) {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe((response) => {
      console.log(response);

      if (response.success && response.data) {
        this.userDetails = response.data;
      }
    });
  }
}
