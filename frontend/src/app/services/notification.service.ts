import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  show(type: 'success' | 'error', message: string, duration: number = 3000) {
    this.notificationSubject.next({ type, message });
    setTimeout(() => this.clear(), duration);
  }

  clear() {
    this.notificationSubject.next(null);
  }
}
