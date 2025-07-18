import { User } from '../app-logic/user/user.model';
import { AuthService } from '../app-logic/user/auth-service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        gender: ['', Validators.required],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        birthDate: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.registerForm.get(controlName)?.hasError(errorName) ?? false;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      console.log('Form valid');

      const userData: User = new User();
      userData.id = this.registerForm.value.id;
      userData.name = this.registerForm.value.name;
      userData.phone = this.registerForm.value.phone;
      userData.birthDate = this.registerForm.value.birthDate;
      userData.gender = this.registerForm.value.gender;
      userData.email = this.registerForm.value.email;
      userData.avatarUrl = 'https://example.com/default-avatar.png'; // Set default avatar URL
      userData.password = this.registerForm.value.password;
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
          this.errorMessage = error.message;

          this.snackBar.open(error.message, 'Închide', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    }
  }
}
