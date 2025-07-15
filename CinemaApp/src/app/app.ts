import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class App {
  isMenuOpen: boolean = false;
  adminExpanded: boolean = false;

  protected title = 'CinemaApp';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
