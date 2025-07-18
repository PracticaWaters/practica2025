import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../app-logic/user/auth-service';
import { User } from '../app-logic/user/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../app-logic/user/user-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getUser();
      this.loginForm = this.fb.group({
        email: [
          this.user?.email || '',
          [Validators.required, Validators.email],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    } else {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.get(controlName)?.hasError(errorName) ?? false;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (user: User) => {
          console.log('✅ Login reușit:', user);
          this.submitted = true;
          this.router.navigate(['/program-cinema']);
          this.userService.refreshUser();
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
        },
      });
    } else {
      this.errorMessage = 'Formular invalid. Verifică emailul și parola.';
    }
  }
}
