import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;
  coverUrl: string = '';
  imageError: boolean = false;
  imageLoading: boolean = true;

  ngOnInit() {
    this.loadCoverImage();
  }

  loadCoverImage() {
    // Remove hífens e espaços do ISBN
    const cleanIsbn = this.book.isbn.replace(/[-\s]/g, '');
    
    // Tenta Open Library primeiro
    this.coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
  }

  onImageLoad() {
    this.imageLoading = false;
  }

  onImageError() {
    if (!this.imageError) {
      this.imageError = true;
      const cleanIsbn = this.book.isbn.replace(/[-\s]/g, '');
      // Tenta uma URL alternativa mais simples
      this.coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`;
    } else {
      this.imageLoading = false;
      this.coverUrl = '';
    }
  }
}
