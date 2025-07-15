import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';


import { Login } from './login/login';
import { Register } from './register/register';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { AppRoot } from './app-root';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { provideAnimations } from '@angular/platform-browser/animations';
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
    Register,
    Login,
    VizualizareFilm,
    DetaliiCinema,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatMenuModule,
    HttpClientModule,
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
    CommonModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations()
  ],
  bootstrap: [App]
})
export class AppModule {
  
 }
