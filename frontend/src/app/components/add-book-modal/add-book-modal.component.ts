import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../book-card/book-card.component';

@Component({
  selector: 'app-add-book-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-book-modal.component.html',
  styleUrl: './add-book-modal.component.css'
})
export class AddBookModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Omit<Book, 'id'>>();

  title = '';
  author = '';
  genre = '';

  onSubmit() {
    if (!this.title.trim() || !this.author.trim() || !this.genre.trim()) return;
    this.add.emit({ title: this.title, author: this.author, genre: this.genre, available: true });
    this.onClose();
  }

  onClose() {
    this.title = '';
    this.author = '';
    this.genre = '';
    this.close.emit();
  }
}
