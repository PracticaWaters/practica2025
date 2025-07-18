import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';
import { AuthService } from './auth-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'https://localhost:25867/api/cinema/user';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user = this.userSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.refreshUser();
  }

  refreshUser() {
    this.authService.userProfile().subscribe((value) => {
      this.userSubject.next(value);
    });
  }

  logOut() {
    this.authService.logOut();
    this.userSubject.next(null);
  }

  update(updatedUser: User) {
    if (this.userSubject.value) {
      this.http
        .put<User>(this.userUrl, updatedUser)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Update failed', error);
            return throwError(() => error);
          })
        )
        .subscribe((updated) => {
          this.userSubject.next(updated);
        });
    }
  }
}
