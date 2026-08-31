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
  private connectionStatus = new Subject<boolean>();

  constructor() {}

  connect(): void {
    if (this.stompClient && this.stompClient.active) {
      console.log('WebSocket déjà connecté');
      return;
    }

    console.log('Tentative de connexion WebSocket...');
    
    const client = new Client({
      webSocketFactory: () => new SockJS(environment.wsUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log('STOMP debug:', str)
    });

    client.onConnect = (frame) => {
      console.log('✅ WebSocket connecté !');
      this.connectionStatus.next(true);
      
      client.subscribe('/topic/notifications', (message) => {
        console.log('📩 Notification reçue:', message.body);
        this.notifications.next(message.body);
      });
    };

    client.onWebSocketClose = () => {
      console.log('❌ WebSocket déconnecté');
      this.connectionStatus.next(false);
    };

    client.onWebSocketError = (error) => {
      console.error('⚠️ Erreur WebSocket:', error);
    };

    client.onStompError = (frame) => {
      console.error('⚠️ Erreur STOMP:', frame.headers['message']);
    };

    this.stompClient = client;
    
    try {
      this.stompClient.activate();
    } catch (error) {
      console.error('Erreur activation STOMP:', error);
    }
  }

  getNotifications(): Observable<string> {
    return this.notifications.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
  }
}