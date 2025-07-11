// app.ts

import { Component, OnInit } from '@angular/core'; // Adăugat OnInit pentru lifecycle hook

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false, // Nu modifica nimic la decorator, conform cerinței
  styleUrl: './app.css'
})
export class App implements OnInit { // Implementat OnInit

  // Variabilă pentru a controla starea meniului mobil (hamburger)
  isMenuOpen: boolean = false;

  // Proprietatea 'title' păstrată conform cerinței
  protected title = 'CinemaApp';

  constructor() { }

  ngOnInit(): void {
    // Aici poți adăuga logica de inițializare dacă este necesar
  }

  // Metodă pentru a comuta starea meniului mobil (deschis/închis)
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Metodă pentru a închide meniul mobil, utilă la click pe link-uri
  closeMenu() {
    this.isMenuOpen = false;
  }
}