import { Component } from '@angular/core';

@Component({
  selector: 'app-meniu-principal',
  standalone: false,
  templateUrl: './meniu-principal.html',
  styleUrl: './meniu-principal.css'
})
export class MeniuPrincipal {
  cards = [
    { titlu: 'Detalii personale', descriere: 'Adaugă sau modifică informațiile personale ' },
    { titlu: 'Bilete', descriere: 'Vizualizează și gestionează biletele tale' },
    { titlu: 'Wishlist', descriere: 'Păstrează filmele preferate într-un singur loc' },
    { titlu: 'Review-uri', descriere: 'Lasă-ți amprenta în comunitatea cinefilă' }
  ];
}
