import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-setari',
  standalone: false,
  templateUrl: './setari.html',
  styleUrl: './setari.css'
})
export class Setari {
  confirmAndSubmit() {}
  onCancel() {}
  form: FormGroup;

    constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      'new-pass': [''],
      'current-pass': ['']
    });
  }
}
