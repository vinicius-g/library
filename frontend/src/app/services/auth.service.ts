import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/auth.model';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';
  private readonly USER_ID_KEY = 'user_id';

  constructor(private http: HttpClient, private userService: UserService) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.ROLE_KEY, response.role);
      }),
      switchMap(response => {
        return this.userService.getAll().pipe(
          tap(users => {
            const currentUser = users.find(user => user.username === username);
            if (currentUser) {
              localStorage.setItem(this.USER_ID_KEY, currentUser.id.toString());
            }
          }),
          map(() => response)
        );
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, { username, password });
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  getUserId(): number {
    const id = localStorage.getItem(this.USER_ID_KEY);
    return id ? parseInt(id, 10) : 0;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
