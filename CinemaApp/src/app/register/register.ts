import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { User } from '../app-logic/user/user.model';
import { AuthService } from '../app-logic/user/auth-service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  registerForm: FormGroup;
  user!: User;
  userId!: number;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\+?[0-9]{7,15}$/), // cifre cu opțional "+" și lungime între 7 și 15
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        birthdate: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // Validator personalizat pentru confirmarea parolei
  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData: User = this.registerForm.value;
      this.authService.register(userData).subscribe(
        (response: User) => {
          this.user = response;
          this.userId = response.id;
          console.log('User registered successfully:', this.user);
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
