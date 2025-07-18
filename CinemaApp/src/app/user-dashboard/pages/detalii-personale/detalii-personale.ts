import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PromptParolaComponent } from './prompt-parola-component/prompt-parola-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detalii-personale',
  standalone: false,
  templateUrl: './detalii-personale.html',
  styleUrl: './detalii-personale.css',
  
})
export class DetaliiPersonale {
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      nume: [''],
      email: [''],
      telefon: [''],
      gen: [''],
    });
  }

  onSubmit() {
    console.log('Date salvate:', this.form.value);
  }

  onCancel() {
    this.form.reset();
  }
  confirmAndSubmit() {
  }

  // pentru poza de profil
  hover = false;
  profileImageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfileImage() {
    this.profileImageUrl = null;
  }
}
