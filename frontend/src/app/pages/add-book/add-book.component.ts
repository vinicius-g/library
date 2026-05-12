import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Checkbox } from 'primeng/checkbox';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, InputText, InputNumber, Checkbox, Button, Card],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private bookService: BookService,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title:         ['', Validators.required],
      author:        ['', Validators.required],
      isbn:          ['', Validators.required],
      categoriesIds: [[], Validators.required],
      copies:        [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.categoryService.getAll().subscribe({
      next: cats => this.categories = cats,
      error: err => console.error('Erro ao buscar categorias:', err)
    });
  }

  onCategoryChange(id: number, checked: boolean) {
    const current: number[] = this.form.get('categoriesIds')!.value;
    const updated = checked ? [...current, id] : current.filter(c => c !== id);
    this.form.get('categoriesIds')!.setValue(updated);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.bookService.create(this.form.value).subscribe({
      next: () => {
        this.notificationService.show('success', 'Livro adicionado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.notificationService.show('error', 'Erro ao adicionar livro. Tente novamente.');
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToBorrowBook() {
    this.router.navigate(['books/borrow']);
  }

  goToReturnBook() {
    this.router.navigate(['books/return']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
