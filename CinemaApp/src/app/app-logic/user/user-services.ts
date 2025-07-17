import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';  // interfaţa ta User
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:25867/api/cinema/user';

  /** Ținem în BehaviorSubject ultima versiune a user-ului */
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService     // pentru token, eventual logout la 401
  ) {
    // Dacă avem deja un user în localStorage, inițializăm subject-ul
    const saved = this.auth.getUser();
    if (saved) {
      this.currentUserSubject.next(saved);
    }
  }

  /** 
   * Cere datele curente ale user-ului 
   * GET https://.../user
   */
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}`, {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` }
    })
    .pipe(
      tap(user => this.currentUserSubject.next(user)),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Trimite datele actualizate ale user-ului
   * PUT https://.../user
   * body: Partial<User>
   */
  updateUser(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}`, userData, {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` }
    })
    .pipe(
      tap(updated => {
        // actualizăm și în BehaviorSubject + localStorage
        this.currentUserSubject.next(updated);
        this.auth.saveAuthData(updated, this.auth.getToken()!);
      }),
      catchError(err => this.handleError(err))
    );
  }

  /** Aruncă un mesaj user-friendly în funcţie de status */
  private handleError(error: HttpErrorResponse) {
    let msg = 'A apărut o eroare neașteptată.';
    if (error.status === 0) {
      msg = 'Nu se poate conecta la server.';
    } else if (error.status === 400) {
      msg = 'Date invalide. Verifică câmpurile.';
    } else if (error.status === 401) {
      msg = 'Nu eşti autentificat. Te rugăm să te autentifici din nou.';
      this.auth.clearAuthData();
      // opţional: redirect la login
    } else if (error.status === 404) {
      msg = 'Profilul nu a fost găsit.';
    } else if (error.status >= 500) {
      msg = 'Eroare de server. Încearcă mai târziu.';
    }
    console.error('UserService error:', error);
    return throwError(() => new Error(msg));
  }
}
