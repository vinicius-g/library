import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Borrowing } from '../../models/borrowing.model';

@Component({
  selector: 'app-borrowed-book-card',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './borrowed-book-card.component.html',
  styleUrl: './borrowed-book-card.component.css'
})
export class BorrowedBookCardComponent implements OnInit {
  @Input() borrowing!: Borrowing;
  coverUrl: string = '';
  imageError: boolean = false;
  imageLoading: boolean = true;
  Math = Math;

  ngOnInit() {
    this.loadCoverImage();
  }

  loadCoverImage() {
    const cleanIsbn = this.borrowing.bookDTO.isbn.replace(/[-\s]/g, '');
    this.coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
  }

  onImageLoad() {
    this.imageLoading = false;
  }

  onImageError() {
    if (!this.imageError) {
      this.imageError = true;
      const cleanIsbn = this.borrowing.bookDTO.isbn.replace(/[-\s]/g, '');
      this.coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`;
    } else {
      this.imageLoading = false;
      this.coverUrl = '';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  isOverdue(): boolean {
    const returnDate = new Date(this.borrowing.mustReturnAt);
    const today = new Date();
    return returnDate < today;
  }

  getRemainingDays(): number {
    const returnDate = new Date(this.borrowing.mustReturnAt);
    const today = new Date();
    const diffTime = returnDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
