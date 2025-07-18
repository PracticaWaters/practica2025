import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-setari',
  standalone: false,
  templateUrl: './setari.html',
  styleUrl: './setari.css'
})
export class Setari {
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  confirmAndSubmit() {
    if (this.form.valid) {
      const { currentPassword, newPassword } = this.form.value;
      console.log('Parolă curentă:', currentPassword);
      console.log('Parolă nouă:', newPassword);
      // TODO: Trimite datele către server
    }
  }

  onCancel() {
    this.form.reset();
  }
}
