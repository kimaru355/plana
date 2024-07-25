import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-hosts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-hosts.component.html',
  styleUrl: './dashboard-hosts.component.css',
})
export class DashboardHostsComponent {
  hosts!: User[];
  errorMessage: string = '';
  successMessage: string = '';
  showMessage: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.getHosts();
  }

  getHosts() {
    this.usersService.getOrganizers().subscribe((response) => {
      if (response.success && response.data) {
        this.hosts = response.data;
      }
    });
  }

  deactivateHost(hostId: string) {
    const isConfirmed: boolean = confirm(
      'Are you sure you want to deactivate this host?'
    );
    if (!isConfirmed) {
      return;
    }
    this.authService.deactivateOrganizer(hostId).subscribe((response) => {
      if (response.success) {
        this.getHosts();
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

  activateHost(hostId: string) {
    const isConfirmed: boolean = confirm(
      'Are you sure you want to verify this host?'
    );
    if (!isConfirmed) {
      return;
    }
    this.authService.verifyOrganizer(hostId).subscribe((response) => {
      if (response.success) {
        this.getHosts();
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
