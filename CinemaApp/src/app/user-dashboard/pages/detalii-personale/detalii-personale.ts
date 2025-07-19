import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PromptParolaComponent } from './prompt-parola-component/prompt-parola-component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../app-logic/user/user-service';
import { User } from '../../../app-logic/user/user.model';

@Component({
  selector: 'app-detalii-personale',
  standalone: false,
  templateUrl: './detalii-personale.html',
  styleUrl: './detalii-personale.css',
  
})
export class DetaliiPersonale implements OnInit {
  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private dialog: MatDialog,
      private userService: UserService
    ) {
      this.form = this.fb.group({
        nume: [''],
        email: [''],
        telefon: [''],
        gen: [''],
        dataNasterii: ['']
      });
    }
    
  ngOnInit(): void {
    this.userService.user.subscribe((user: User | null) => {
      console.log('DATE UTILIZATOR:', JSON.stringify(user, null, 2));
    });

    this.userService.user.subscribe((user: User | null) => {
      if (user) {
        this.form.patchValue({
          nume: user.name,
          email: user.email,
          telefon: user.phone,
          gen: user.gender,
          dataNasterii: user.birthDate ? user.birthDate.split('T')[0] : ''
        });

        if (user.avatarUrl) {
          this.profileImageUrl = user.avatarUrl;
        }
      }
    });
  }

  onSubmit() {
    console.log('Date salvate:', this.form.value);
  }

  onCancel() {
    this.form.reset();
  }

  confirmAndSubmit() {
    const updatedUser: Partial<User> = {
      name: this.form.value.nume,
      email: this.form.value.email,
      phone: this.form.value.telefon,
      gender: this.form.value.gen,
      birthDate: this.form.value.dataNasterii,
      avatarUrl: this.profileImageUrl?.toString()
    };

    this.userService.update(updatedUser as User);
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
