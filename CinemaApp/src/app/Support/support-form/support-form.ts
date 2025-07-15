import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportService } from '../services/support.service';
import { SupportTicket } from '../services/support-ticket';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.html',
  styleUrls: ['./support-form.css'],
  standalone: false,
})
export class SupportForm {
  formularContact: FormGroup;
  loading = false;
  successMsg = '';
  errorMsg = '';
  ticketTrimis = false;

  constructor(private fb: FormBuilder, private supportService: SupportService) {
    this.formularContact = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    this.successMsg = '';
    this.errorMsg = '';
    if (this.formularContact.valid) {
      this.loading = true;
      const payload: SupportTicket = {
        id: 0,
        name: this.formularContact.value.name,
        email: this.formularContact.value.email,
        message: this.formularContact.value.message,
        status: true,
        createdAt: new Date().toISOString(),
        selectat: false,
      };
      this.supportService.sendTicket(payload).subscribe({
        next: () => {
          this.ticketTrimis = true;
          this.formularContact.reset();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error:', err);
          this.errorMsg = 'Eroare';
          this.loading = false;
        },
      });
    } else {
      this.formularContact.markAllAsTouched();
    }
  }

  get emailInvalid() {
    const emailCtrl = this.formularContact.get('email');
    return (
      emailCtrl && emailCtrl.invalid && (emailCtrl.dirty || emailCtrl.touched)
    );
  }
}
