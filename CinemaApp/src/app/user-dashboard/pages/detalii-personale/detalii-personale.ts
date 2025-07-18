import { Component } from '@angular/core';
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
    });
  }

  onSubmit() {
    console.log('Date salvate:', this.form.value);
  }

  onCancel() {
    this.form.reset();
  }
  confirmAndSubmit() {
    const dialogRef = this.dialog.open(PromptParolaComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((password) => {
      if (password) {
        // Aici poți verifica parola dacă vrei, ex:
        if (password === 'admin123') {
          this.onSubmit();
        } else {
          alert('Parola incorectă!');
        }
      } else {
        // Dialog anulat, nu se face nimic
        console.log('Salvarea a fost anulată.');
      }
    });
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
