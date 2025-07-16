import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- importă aici
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { MatSelectModule } from '@angular/material/select';
import { MatOption, MatOptionModule } from '@angular/material/core';

// Import CoreUI modules and directives:
import { HttpClientModule } from '@angular/common/http';
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
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { Login } from './login/login';
import { Register } from './register/register';



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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatMenuModule,
    HttpClientModule,
    CommonModule,
    // CoreUI modules:
    NavbarModule,
    DropdownModule,
    CollapseModule,
    MatSelectModule,
    MatOptionModule,

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
