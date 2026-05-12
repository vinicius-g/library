import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <div *ngIf="loadingService.isLoading$ | async" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
        <p class="text-sm text-gray-600">Carregando...</p>
      </div>
    </div>
  `,
  styles: []
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
