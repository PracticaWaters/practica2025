import { Component, ViewEncapsulation } from '@angular/core';
import { User } from './app-logic/user/user.model';
import { Observable } from 'rxjs';
import { UserService } from './app-logic/user/user-service';

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
  user: Observable<User | null>;

  protected title = 'Liquid Cinema';

  constructor(private userService: UserService) {
    this.userService.logOut();
    this.user = this.userService.user;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
