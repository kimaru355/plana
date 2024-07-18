import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  isVisible: boolean = true;

  constructor() {
    setInterval(() => {
      this.isVisible = !this.isVisible;
    }, 3000);
  }
}
