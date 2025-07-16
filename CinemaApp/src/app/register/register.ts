import { User } from '../app-logic/user/user.model';
import { AuthService } from '../app-logic/user/auth-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordsMatchValidator });
  }

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.registerForm.get(controlName)?.hasError(errorName) ?? false;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form valid');

      const userData: User = new User(this.registerForm.value);
      userData.avatarUrl = 'https://example.com/default-avatar.png'; // Set default avatar URL
      userData.gender = 'feminin';
      userData.role = 0;
      userData.createdAt = new Date();
      userData.modifiedAt = new Date();
      userData.isDeleted = false;

      console.log('Registering user:', userData);
      this.authService.register(userData).subscribe({
        next: (response: string) => {
          console.log('User registered successfully');
          this.errorMessage = null;

          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('❌ Registration error:', error);

          if (error.status === 0) {
            this.errorMessage = 'Nu se poate conecta la server.';
          } else if (error.status === 400) {
            this.errorMessage = 'Date invalide. Verificați formularul.';
          } else if (error.status === 409) {
            this.errorMessage = 'Emailul este deja înregistrat.';
          } else {
            this.errorMessage = `Eroare server (${error.status}): ${error.message}`;
          }
        },
      });
    }
  }
}
