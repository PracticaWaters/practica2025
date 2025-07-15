import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
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

  register(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData);
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
