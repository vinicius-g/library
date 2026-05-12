import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { User } from '../../models/user.model';
import { Borrowing } from '../../models/borrowing.model';
import { UserService } from '../../services/user.service';
import { ReturnService } from '../../services/return.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Select, DatePicker, Button, Card],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  borrowings: Borrowing[] = [];
  selectedUserId: number | null = null;
  isAdmin: boolean = false;

  bookConditions = [
    { value: 'EXCELENTE', label: 'Excelente' },
    { value: 'BOM', label: 'Bom' },
    { value: 'REGULAR', label: 'Regular' },
    { value: 'RUIM', label: 'Ruim' },
    { value: 'DANIFICADO', label: 'Danificado' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private returnService: ReturnService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      borrowingId: ['', Validators.required],
      returnedAt: ['', Validators.required],
      bookCondition: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.userService.getAll().subscribe({
      next: users => this.users = users,
      error: err => console.error('Erro ao buscar usuários:', err)
    });
  }

  onUserChange(event: any) {
    const userId = event.value;
    this.selectedUserId = userId;
    this.form.get('borrowingId')?.setValue('');
    this.borrowings = [];

    if (userId) {
      this.returnService.getActiveBorrowings(userId).subscribe({
        next: borrowings => this.borrowings = borrowings,
        error: err => console.error('Erro ao buscar empréstimos:', err)
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload = {
      borrowingId: Number(this.form.value.borrowingId),
      returnedAt: new Date(this.form.value.returnedAt).toISOString(),
      bookCondition: this.form.value.bookCondition
    };

    this.returnService.returnBook(payload).subscribe({
      next: () => {
        this.notificationService.show('success', 'Livro devolvido com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        const message = err.error?.message || 'Erro ao devolver livro';
        this.notificationService.show('error', message);
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  goToAddBook() {
    this.router.navigate(['books/add']);
  }

  goToBorrowBook() {
    this.router.navigate(['books/borrow']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
