import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BorrowingService } from '../../services/borrowing.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { avaliableBooks } from '../../models/avaliable-books.model';

@Component({
  selector: 'app-borrow-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Select, Button, Card],
  templateUrl: './borrow-book.component.html',
  styleUrl: './borrow-book.component.css'
})
export class BorrowBookComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  avaliableBooks: avaliableBooks[] = [];
  isAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private userService: UserService,
    private borrowingService: BorrowingService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      bookId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.userService.getAll().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => console.error('Erro ao buscar usuários:', err)
    });

    this.bookService.getAll().subscribe({
      next: books => {
        this.avaliableBooks = books
          .filter(b => b.availableCopies > 0)
          .map(book => ({
            ...book,
            displayName: `${book.title} (${book.availableCopies})`
          }));
      },
      error: err => console.error('Erro ao buscar livros:', err)
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    // Calcula data de devolução: 7 dias a partir de hoje
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);

    const payload = {
      userId: Number(this.form.value.userId),
      bookId: Number(this.form.value.bookId),
      mustReturnAt: returnDate.toISOString()
    };

    this.borrowingService.create(payload).subscribe({
      next: () => {
        this.notificationService.show('success', 'Livro emprestado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Erro completo:', err);
        this.notificationService.show('error', err.error?.message || 'Erro ao emprestar livro');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  goToAddBook() {
    this.router.navigate(['books/add']);
  }

  goToReturnBook() {
    this.router.navigate(['books/return']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
