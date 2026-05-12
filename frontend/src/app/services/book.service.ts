import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Book, CreateBookPayload } from '../models/book.model';
import { PageResponse } from '../models/page-response.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly url = `${environment.apiUrl}/book`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  getAll(): Observable<Book[]> {
    return this.http.get<PageResponse<Book>>(`${this.url}?size=100`).pipe(
      map(page => page.content)
    );
  }

  create(payload: CreateBookPayload): Observable<Book> {
    return this.http.post<Book>(this.url, payload, { headers: this.headers() });
  }
}
