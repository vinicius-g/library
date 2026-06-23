import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BorrowedBookCardComponent } from '../../components/borrowed-book-card/borrowed-book-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { BorrowingService } from '../../services/borrowing.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Borrowing } from '../../models/borrowing.model';

@Component({
  selector: 'app-borrowed-books',
  standalone: true,
  imports: [NgFor, NgIf, BorrowedBookCardComponent, HeaderComponent],
  templateUrl: './borrowed-books.component.html',
  styleUrl: './borrowed-books.component.css'
})
export class BorrowedBooksComponent implements OnInit {
  borrowings: Borrowing[] = [];
  userId: number = 0;
  loading: boolean = true;

  constructor(
    private borrowingService: BorrowingService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    let userId = this.authService.getUserId();
    
    if (!userId) {
      const token = this.authService.getToken();
      const username = this.extractUsernameFromToken(token);
      
      if (!username) {
        console.error('Não foi possível obter o username');
        this.router.navigate(['/dashboard']);
        return;
      }
      
      this.userService.getAll().subscribe({
        next: users => {
          const currentUser = users.find(user => user.username === username);
          if (currentUser) {
            userId = currentUser.id;
            localStorage.setItem('user_id', userId.toString());
            this.loadBorrowings(userId);
          } else {
            console.error('Usuário não encontrado');
            this.router.navigate(['/dashboard']);
          }
        },
        error: err => {
          console.error('Erro ao buscar usuários:', err);
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.loadBorrowings(userId);
    }
  }

  private extractUsernameFromToken(token: string | null): string | null {
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || null;
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return null;
    }
  }

  private loadBorrowings(userId: number): void {
    this.borrowingService.getActiveBorrowings(userId).subscribe({
      next: response => {
        this.borrowings = response.content;
        this.loading = false;
      },
      error: err => {
        console.error('Erro ao buscar empréstimos:', err);
        this.loading = false;
      }
    });
  }
}
