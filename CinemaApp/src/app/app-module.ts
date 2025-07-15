import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- importă aici
import {MatIconModule} from '@angular/material/icon'
// Import CoreUI modules and directives:
import {
  NavbarModule,
  DropdownModule,
  CollapseModule,
  NavbarComponent,
  ContainerComponent,
  NavbarBrandDirective,
  NavbarTogglerDirective,
  CollapseDirective,
  NavbarNavComponent,
  NavItemComponent,
  DropdownComponent,
  DropdownToggleDirective,
  NavLinkDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  
} from '@coreui/angular';
import { UserDashboard } from './user-dashboard/user-dashboard';

@NgModule({
  declarations: [
    App,
    VizualizareFilm,
    UserDashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatMenuModule,
    MatExpansionModule,
    MatIconModule,

    // CoreUI modules:
    NavbarModule,
    DropdownModule,
    CollapseModule,

    // CoreUI components and directives:
    NavbarComponent,
    ContainerComponent,
    NavbarBrandDirective,
    NavbarTogglerDirective,
    CollapseDirective,
    NavbarNavComponent,
    NavItemComponent,
    DropdownComponent,
    DropdownToggleDirective,
    NavLinkDirective,
    DropdownMenuDirective,
    DropdownItemDirective
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations()
  ],
  bootstrap: [App]
})
export class AppModule {
  
 }
