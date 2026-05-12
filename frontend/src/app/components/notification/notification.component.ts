import { Component } from '@angular/core';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgIf, NgClass, AsyncPipe],
  template: `
    <div *ngIf="notificationService.notification$ | async as notification"
      class="fixed top-5 right-5 z-50 px-5 py-3 rounded-lg text-sm font-semibold shadow-lg text-white animate-slide-in"
      [ngClass]="{
        'bg-green-500': notification.type === 'success',
        'bg-red-500': notification.type === 'error'
      }"
    >
      {{ notification.message }}
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
  `]
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}
}
