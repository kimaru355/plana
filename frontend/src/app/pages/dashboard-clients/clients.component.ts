import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {
  role: 'organizer' | 'admin' =
    (localStorage.getItem('role') as 'organizer' | 'admin') || '';
  clients!: User[];
  errorMessage: string = '';
  successMessage: string = '';
  showMessage: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
    if (this.role === 'admin') {
      this.getUsers();
    } else if (this.role === 'organizer') {
      this.getClients();
    }
  }

  getClients() {
    this.usersService.getClients().subscribe((response) => {
      if (response.success && response.data) {
        this.clients = response.data;
      }
    });
  }

  getUsers() {
    this.usersService.getUsers().subscribe((response) => {
      if (response.success && response.data) {
        this.clients = response.data;
      }
    });
  }

  deactivateClient(clientId: string) {
    const isConfirmed: boolean = confirm(
      'Are you sure you want to deactivate this host?'
    );
    if (!isConfirmed) {
      return;
    }
    this.authService.deactivateUser(clientId).subscribe((response) => {
      if (response.success) {
        this.getUsers();
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
