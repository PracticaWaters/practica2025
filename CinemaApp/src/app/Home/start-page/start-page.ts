import { Component } from '@angular/core';
import { Promotii} from '../../promotii/promotii';
import { Steps } from '../steps/steps';
import { Reclama } from '../reclama/reclama';

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
