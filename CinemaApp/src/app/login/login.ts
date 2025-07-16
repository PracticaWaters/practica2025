import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../app-logic/user/auth-service';
import { Router } from '@angular/router';
import { User } from '../app-logic/user/user.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getUser();

      this.loginForm = this.fb.group({
        email: [this.user?.email, [Validators.required, Validators.email]],
        password: [this.user?.password, Validators.required],
      });
    } else {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (user: User) => {
          console.log('✅ Login reușit:', user);
          this.router.navigate(['/register']);
        },
        error: (error: Error) => {
          this.errorMessage = error.message; // De ex. „Email sau parolă incorecte.”
        },
      });
    } else {
      this.errorMessage = 'Formular invalid. Verifică emailul și parola.';
    }
  }
}
