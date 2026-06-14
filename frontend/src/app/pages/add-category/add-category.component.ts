import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { HeaderComponent } from '../../components/header/header.component';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, InputText, Button, Card, HeaderComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    if (!this.isAdmin) {
      this.notificationService.show('error', 'Acesso negado. Apenas administradores podem cadastrar categorias.');
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const name = this.form.value.name;
    this.categoryService.create({ name }).subscribe({
      next: () => {
        this.notificationService.show('success', 'Categoria cadastrada com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar categoria:', err);
        this.notificationService.show('error', 'Erro ao cadastrar categoria. Tente novamente.');
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
}
