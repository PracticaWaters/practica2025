import { Component } from '@angular/core';
import { AppRoutingModule } from "./app-routing-module";

@Component({
  selector: 'app-app-root',
  standalone: true,
  templateUrl: './app-root.html',
  styleUrl: './app-root.css',
  imports: [AppRoutingModule]
})
export class AppRoot {

}
