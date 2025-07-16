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
  private apiUrl = 'https://localhost:25867/api/cinema';
  private user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user.next(JSON.parse(storedUser));
    }
  }

  register(userData: Partial<User>): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/register`, userData, {
        responseType: 'text',
      })
      .pipe(
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
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);

          // Emiterea userului în fluxul aplicației
          this.user.next(response.user);
          console.log('User logged in:', response.user);
        }),
        // Emitem doar user-ul către subscribe (nu întregul LoginResponse)
        map((response: LoginResponse) => response.user)
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.user.next(null);
  }

  // read-only observable for the current user
  get currentUser$(): Observable<User | null> {
    return this.user.asObservable();
  }
}
