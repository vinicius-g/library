import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { BorrowBookComponent } from './pages/borrow-book/borrow-book.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReturnBookComponent } from './pages/return-book/return-book.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books/add', component: AddBookComponent },
  { path: 'books/borrow', component: BorrowBookComponent },
  { path: 'books/return', component: ReturnBookComponent },
];
