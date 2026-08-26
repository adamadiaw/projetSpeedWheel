import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private message = new BehaviorSubject<string>('');
  private type = new BehaviorSubject<'success' | 'error' | 'info'>('info');
  
  message$ = this.message.asObservable();
  type$ = this.type.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.message.next(message);
    this.type.next(type);

    // Auto-hide après 3 secondes
    setTimeout(() => {
      this.message.next('');
    }, 3000);
  }
}