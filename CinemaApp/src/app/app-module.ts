import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { Login } from './login/login';
import { Register } from './register/register';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- importă aici
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';


// Import CoreUI modules and directives:
import {
  CollapseDirective,
  CollapseModule,
  ContainerComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownModule,
  DropdownToggleDirective,
  NavbarBrandDirective,
  NavbarComponent,
  NavbarModule,
  NavbarNavComponent,
  NavbarTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
} from '@coreui/angular';



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
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations()
  ],
  bootstrap: [App]
})
export class AppModule {
  
 }
