import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- importă aici
import { CommonModule } from '@angular/common';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';


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

import { ProgramCinema } from './program-cinema/program-cinema';


@NgModule({
  declarations: [
    App,
    VizualizareFilm,
    DetaliiCinema,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    BrowserModule,
    MatExpansionModule,
    CommonModule,
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
    DropdownItemDirective,
    MatExpansionModule,
    MatInputModule,
    MatMenuModule,
    CommonModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations()
  ],
  bootstrap: [App]
})
export class AppModule {
  
 }
