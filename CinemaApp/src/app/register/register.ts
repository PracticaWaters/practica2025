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

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
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
      const { confirmPassword, ...payload } = this.registerForm.value;
      this.http.post('/api/auth/register', payload).subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => console.error('Registration failed', err)
      });
    }
  }
}