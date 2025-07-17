import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginResponse } from './login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:25867/api/cinema/auth';
  private user = new BehaviorSubject<User | null>(null);

  private readonly USER_KEY = 'user';
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {
    const storedUser = this.getUser();
    if (storedUser) {
      this.user.next(storedUser);
    }
  }

  register(userData: Partial<User>): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/register`, userData, {
        responseType: 'text',
      })
      .pipe(
        tap(() => {
          localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Registration failed:', error);

          let errorMsg = 'An unknown error occurred.';

          if (error.status === 0) {
            errorMsg = 'Cannot connect to server.';
          } else if (error.status === 400) {
            errorMsg = 'Invalid data. Please check your form.';
          } else if (error.status === 409) {
            errorMsg = 'Email already registered.';
          } else if (error.status >= 500) {
            errorMsg = 'Server error. Please try again later.';
          }

          return throwError(() => new Error(errorMsg));
        })
      );
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: LoginResponse) => {
          this.saveAuthData(response.user, response.token);

          this.user.next(response.user);
          console.log('User logged in:', response.user);
        }),
        map((response: LoginResponse) => response.user),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = 'A apărut o eroare la autentificare.';

          if (error.status === 0) {
            errorMsg = 'Nu se poate conecta la server.';
          } else if (error.status === 401) {
            errorMsg = 'Email sau parolă incorecte.';
          } else if (error.status >= 500) {
            errorMsg = 'Eroare de server. Încearcă mai târziu.';
          }

          return throwError(() => new Error(errorMsg));
        })
      );
  }

  saveAuthData(user: User, token: string): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUser(): User | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? (JSON.parse(data) as User) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearAuthData(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null && this.getToken() !== null;
  }
}
