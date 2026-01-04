import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginDTO, AuthResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/auth`;

  login(credentials: LoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, credentials).pipe(
      tap(res => {
        if (res.success) {
          localStorage.setItem('ultron_user', JSON.stringify(res.user));
        }
      })
    );
  }

  getUser(): User | null {
    const user = localStorage.getItem('ultron_user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('ultron_user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('ultron_user');
  }
}