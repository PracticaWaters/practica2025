import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard {
  cards = [
    { titlu: 'Casetă 1', descriere: 'Aceasta este prima casetă.' },
    { titlu: 'Casetă 2', descriere: 'Aceasta este a doua casetă.' },
    { titlu: 'Casetă 3', descriere: 'Aceasta este a treia casetă.' }
  ];
}
