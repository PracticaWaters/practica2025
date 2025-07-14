import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.html',
  styleUrls: ['./support-form.css'],
  standalone: false
})
export class SupportForm {
  formularContact: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularContact = this.fb.group({
      nume: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mesaj: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formularContact.valid) {
      console.log('Trimis:', this.formularContact.value);
      this.formularContact.reset();
    }
  }
}
