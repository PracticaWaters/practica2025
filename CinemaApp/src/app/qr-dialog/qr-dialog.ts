import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-dialog',
  standalone: true,  
  imports: [MatDialogModule],
  template: `
    <h2 mat-dialog-title style="text-align:center; font-size: 20px;">Cod QR pentru bilet</h2>
    <mat-dialog-content style="display: flex; justify-content: center; padding: 15px;">
      <img [src]="qrUrl" alt="QR Code" style="width: 200px; height: 200px;" />
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close class="bg-black text-white px-1 py-1 rounded hover:bg-gray-800 hover:shadow transition duration-200">Închide</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./qr-dialog.css'],
  encapsulation: ViewEncapsulation.None
})
export class QrDialog {
  qrUrl: string;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: { qrData: string }) {
    const encoded = encodeURIComponent(data.qrData);
    const bgColor = 'FFFFFF';  // fundal alb
    this.qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=200x200&bgcolor=${bgColor}`;
  }
}