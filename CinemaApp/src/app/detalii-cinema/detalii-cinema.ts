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
detaliicinemaData:DetaliiCinemaData;
constructor(private detaliicinemaProvider:DetaliiCinemaProvider) {
      this.detaliicinemaData= detaliicinemaProvider.getData();
}
}
