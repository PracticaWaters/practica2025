import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportService, SuportTicket } from '../services/support.service';

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
      nume: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mesaj: ['', Validators.required],
    });
  }

  onSubmit() {
    this.successMsg = '';
    this.errorMsg = '';
    if (this.formularContact.valid) {
      this.loading = true;
      const payload: SuportTicket = {
        name: this.formularContact.value.nume,
        email: this.formularContact.value.email,
        message: this.formularContact.value.mesaj,
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
