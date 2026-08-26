import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  message = '';
  type = 'info';

  constructor(private notificationService: NotificationService) {
    this.notificationService.message$.subscribe(message => {
      this.message = message;
    });
    this.notificationService.type$.subscribe(type => {
      this.type = type;
    });
  }
}