import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meniu-principal',
  standalone: false,
  templateUrl: './meniu-principal.html',
  styleUrl: './meniu-principal.css'
})
export class MeniuPrincipal {
  constructor(public route: ActivatedRoute) {};

  cards = [
    { titlu: 'Detalii personale', descriere: 'Adaugă sau modifică informațiile personale ', link:'detalii'},
    { titlu: 'Bilete', descriere: 'Vizualizează și gestionează biletele tale', link: 'bilete'},
    { titlu: 'Wishlist', descriere: 'Păstrează filmele preferate într-un singur loc', link: 'wishlist' },
    { titlu: 'Review-uri', descriere: 'Lasă-ți amprenta în comunitatea cinefilă', link: 'review-uri' }
  ];
}
