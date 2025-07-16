import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { Login } from './login/login';
import { Register } from './register/register';
import { Faq } from './Support/faq/faq';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportForm } from './Support/support-form/support-form';
import { SupportPage } from './Support/support-page/support-page';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

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
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [provideAnimations()],
  bootstrap: [App],
})
export class AppModule {}
