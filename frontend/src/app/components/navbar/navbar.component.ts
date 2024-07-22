import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  token: string = localStorage.getItem('token') || '';
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  }
}
