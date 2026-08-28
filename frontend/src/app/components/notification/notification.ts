import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification implements OnInit {
  message = '';
  type = 'info';

  constructor(
    private notificationService: NotificationService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    // Notifications normales (via service)
    this.notificationService.message$.subscribe(message => {
      this.message = message;
    });
    this.notificationService.type$.subscribe(type => {
      this.type = type;
    });

    // Écouter les messages WebSocket (c'est ICI que ça doit se faire)
    this.webSocketService.getNotifications().subscribe(message => {
      this.notificationService.show(message, 'info');
    });
  }
}