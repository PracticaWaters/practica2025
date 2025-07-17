import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prompt-parola-component',
  standalone: false,
  templateUrl: './prompt-parola-component.html',
  styleUrl: './prompt-parola-component.css',
})
export class PromptParolaComponent {
  password: string = '';

  constructor(private dialogRef: MatDialogRef<PromptParolaComponent>) {}

  onCancel() {
    this.dialogRef.close(null);
  }

  onConfirm() {
    this.dialogRef.close(this.password);
  }
}
