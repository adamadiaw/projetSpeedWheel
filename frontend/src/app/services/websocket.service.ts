import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client | null = null;
  private notifications = new Subject<string>();

  constructor() {}

  connect(): void {
    // Évite de recréer un client si un autre est déjà actif
    if (this.stompClient && this.stompClient.active) {
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(environment.wsUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    client.onConnect = (frame) => {
      console.log('WebSocket connecté !');
      
      // ⚠️ IMPORTANT : on utilise `message.body` qui est le texte brut
      client.subscribe('/topic/notifications', (message) => {
        this.notifications.next(message.body); // message.body est une String
      });
    };

    client.onWebSocketClose = () => {
      console.log('WebSocket déconnecté');
    };

    client.onWebSocketError = (error) => {
      console.error('Erreur technique WebSocket :', error);
    };

    client.onStompError = (frame) => {
      console.error('Erreur STOMP de niveau courtier :', frame.headers['message']);
    };

    this.stompClient = client;
    this.stompClient.activate();
  }

  getNotifications(): Observable<string> {
    return this.notifications.asObservable();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
  }
}