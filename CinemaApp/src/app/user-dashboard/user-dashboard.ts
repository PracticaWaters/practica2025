import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard {
  cards = [
    { titlu: 'Detalii personale', descriere: 'Adaugă sau modifică informațiile personale ' },
    { titlu: 'Bilete', descriere: 'Vizualizează și gestionează biletele tale' },
    { titlu: 'Wishlist', descriere: 'Păstrează filmele preferate într-un singur loc' },
    { titlu: 'Review-uri', descriere: 'Lasă-ți amprenta în comunitatea cinefilă' }
  ];
}
