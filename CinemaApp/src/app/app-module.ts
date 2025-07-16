import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';

// Import CoreUI modules and directives:
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { Faq } from './Support/faq/faq';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportForm } from './Support/support-form/support-form';
import { SupportPage } from './Support/support-page/support-page';

@NgModule({
  declarations: [
    App,
    Register,
    Login,
    VizualizareFilm,
    SupportPage,
    SupportAdmin,
    SupportForm,
    Faq,
    DetaliiCinema,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    CommonModule,
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
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [
          provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),  // ✅ Activează Fetch API
  ],
  bootstrap: [App],
})
export class AppModule {}
