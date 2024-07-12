import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent {
  token: string = localStorage.getItem('token') || '';
  currentRoute: string = 'analytics';
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
