import { Component } from '@angular/core';

@Component({
  selector: 'app-meniu-principal',
  standalone: false,
  templateUrl: './meniu-principal.html',
  styleUrl: './meniu-principal.css'
})
export class MeniuPrincipal {
    cards = [
    { titlu: 'Casetă 1', descriere: 'Aceasta este prima casetă.' },
    { titlu: 'Casetă 2', descriere: 'Aceasta este a doua casetă.' },
    { titlu: 'Casetă 3', descriere: 'Aceasta este a treia casetă.' }
  ];
}
