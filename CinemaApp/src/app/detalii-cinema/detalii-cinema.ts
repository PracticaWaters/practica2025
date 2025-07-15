import { Component } from '@angular/core';
import { DetaliiCinemaProvider } from '../app-logic/detalii-cinema-provider';
import { DetaliiCinemaData } from '../app-logic/detalii-cinema-data';

@Component({
  selector: 'app-detalii-cinema',
  standalone: false,
  templateUrl: './detalii-cinema.html',
  styleUrl: './detalii-cinema.css'
})
export class DetaliiCinema {
  detaliicinemaData: DetaliiCinemaData;
  editMode = false;

  constructor(private detaliicinemaProvider: DetaliiCinemaProvider) {
    this.detaliicinemaData = detaliicinemaProvider.getData();
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;

    if (!this.editMode) {
      // Optional: salvează înapoi în provider (în memorie)
      this.detaliicinemaProvider.provideData = this.detaliicinemaData;
      console.log('Date salvate:', this.detaliicinemaData);
    }
  }
}
