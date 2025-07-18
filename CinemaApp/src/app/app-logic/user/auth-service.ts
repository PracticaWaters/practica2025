import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from './user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginResponse, TokenResponse } from './response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'https://localhost:25867/api/cinema/auth';
  private user = new BehaviorSubject<Partial<User> | null>(null);

  private readonly USER_KEY = 'user';
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient) {
    this.user.next(this.getUser());
  }

  register(userData: Partial<User>): Observable<string> {
    return this.http
      .post(`${this.authUrl}/register`, userData, {
        responseType: 'text',
      })
      .pipe(
        tap(() => {
          this.user.next(userData);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Registration failed:', error);

          let errorMsg = 'An unknown error occurred.';

          if (error.status === 0) {
            errorMsg = 'Nu se poate conecta la server.';
          } else if (error.status === 400) {
            errorMsg = 'Date invalide. Verificați formularul.';
          } else if (error.status === 409) {
            errorMsg = 'Emailul este deja înregistrat.';
          } else if (error.status >= 500) {
            errorMsg = 'Eroare de server. Încearcă mai târziu.';
          }

          // ❗ returnezi un obiect cu status + mesaj
          return throwError(() => ({
            status: error.status,
            message: errorMsg
          }));
        })
      );
  }

  userProfile(): Observable<User | null> {
    return this.http.get<User>(`${this.authUrl}/self`).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<LoginResponse>(`${this.authUrl}/login`, credentials)
      .pipe(
        tap((response: LoginResponse) => {
          this.saveAuthData(
            response.user,
            response.accessToken,
            response.refreshToken
          );

          this.user.next(response.user);
          // console.log('User logged in:', response.user);
          // console.log('User self');
          // let user = this.userProfile().subscribe({
          //   next: (user) => console.log(JSON.stringify(user, null, 2)),
          //   error: (err) => {
          //     if (err.status === 401) {
          //       console.warn('Unauthorized: Token may be expired.');
          //     }
          //   },
          // });

          // setTimeout(() => {
          //   console.log('Calling userProfile again after 2 minutes...');
          //   this.userProfile().subscribe({
          //     next: (user) =>
          //       console.log('Delayed call:', JSON.stringify(user, null, 2)),
          //     error: (err) => {
          //       if (err.status === 401) {
          //         console.warn('Unauthorized after delay.');
          //       }
          //     },
          //   });
          // }, 1 * 60 * 1000);
        }),
        map((response: LoginResponse) => response.user),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = 'A apărut o eroare la autentificare.';

          if (error.status === 0) {
            errorMsg = 'Nu se poate conecta la server.';
          } else if (error.status === 401 || error.status === 400) {
            errorMsg = 'Email sau parolă incorecte.';
          } else if (error.status >= 500) {
            errorMsg = 'Eroare de server. Încearcă mai târziu.';
          }

          return throwError(() => ({
            status: error.status,
            message: errorMsg
          }));
        })
      );
  }

  saveAuthData(user: User, accessToken: string, refreshToken: string): void {
    this.user.next(user);
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  getUser(): User | null {
    const data = this.user.value;
    return data ? (data as User) : null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  logOut(): void {
    this.user.next(null);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null && this.getAccessToken() !== null;
  }

  refreshToken(): Observable<TokenResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token found.'));
    }

    return this.http
      .post<TokenResponse>(`${this.authUrl}/refresh`, {
        refreshToken: refreshToken,
      })
      .pipe(
        tap((response: TokenResponse) => {
          if (response.accessToken && response.refreshToken) {
            localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
            localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Token refresh failed:', error);
          this.logOut();
          return throwError(
            () => new Error('Session expired. Please log in again.')
          );
        })
      );
  }
}
