import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Notification } from './components/notification/notification';
import { NotificationService } from './services/notification.service';
import { WebSocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, Notification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private webSocketService: WebSocketService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.webSocketService.connect();
    
    // Écouter les messages WebSocket et les afficher
    this.webSocketService.getNotifications().subscribe(message => {
      this.notificationService.show(message, 'info');
    });
  }
}