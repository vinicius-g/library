import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Borrowing, ReturnBookPayload } from '../models/borrowing.model';

@Injectable({ providedIn: 'root' })
export class ReturnService {
  private readonly url = `${environment.apiUrl}/borrowing`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  getActiveBorrowings(userId: number): Observable<Borrowing[]> {
    return this.http.get<any>(`${this.url}/active/${userId}?size=100`, { headers: this.headers() }).pipe(
      map(response => response.content)
    );
  }

  returnBook(payload: ReturnBookPayload): Observable<any> {
    return this.http.post(`${this.url}/return`, payload, { headers: this.headers() });
  }
}
