import { User } from '../app-logic/user/user.model';
import { AuthService } from '../app-logic/user/auth-service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
<<<<<<< HEAD
  ValidatorFn,
=======
>>>>>>> d8907fadb5b707183763ebe14e7c1749a734f40d
} from '@angular/forms';
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
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
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
<<<<<<< HEAD
        password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.passwordComplexityValidator()
        ]
      ],
=======
        password: ['', [Validators.required, Validators.minLength(6)]],
>>>>>>> d8907fadb5b707183763ebe14e7c1749a734f40d
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

<<<<<<< HEAD
  private passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      if (!value) {
        return null; // lasă Validators.required să semnaleze
      }
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const valid = hasUpper && hasLower && hasNumber && hasSpecial;
      return valid ? null : { complexity: true };
    };
  }

=======
>>>>>>> d8907fadb5b707183763ebe14e7c1749a734f40d
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
