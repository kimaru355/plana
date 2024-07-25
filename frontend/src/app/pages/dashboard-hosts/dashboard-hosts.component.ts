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
  showConfirmation: boolean = false;
  isConfirmed = false;
  hostId!: string;
  warningMessage: string = '';

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

  verifyHost(hostId: string) {
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

  showVerifyConfirmDialog(hostId: string) {
    this.showConfirmation = true;
    this.hostId = hostId;
    this.warningMessage = 'Are you sure you want to verify this user?';
  }

  showDeleteConfirmDialog(hostId: string) {
    this.showConfirmation = true;
    this.hostId = hostId;
    this.warningMessage = 'Are you sure you want to deactivate this host?';
  }

  confirmDialog(status: boolean) {
    if (!status) {
      this.isConfirmed = false;
      this.showConfirmation = false;
      return;
    }
    this.showConfirmation = false;
    if (
      this.warningMessage === 'Are you sure you want to deactivate this host?'
    ) {
      this.deactivateHost(this.hostId);
    } else if (
      this.warningMessage === 'Are you sure you want to verify this user?'
    ) {
      this.verifyHost(this.hostId);
    }
  }
}
