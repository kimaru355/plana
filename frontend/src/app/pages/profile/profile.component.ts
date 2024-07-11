import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userDetails = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '0712345678',
    country: 'Kenya',
  };
}
