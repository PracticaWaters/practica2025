import { Component } from '@angular/core';

@Component({
  selector: 'app-start-page',
  standalone: false,
  templateUrl: './start-page.html',
  styleUrls: ['./start-page.css'],

})
export class StartPageComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
