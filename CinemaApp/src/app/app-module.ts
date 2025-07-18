import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { SupportPage } from './Support/support-page/support-page';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportForm } from './Support/support-form/support-form';
import { Faq } from './Support/faq/faq';
import { Steps } from './Home/Steps/steps/steps';

@NgModule({
  declarations: [
    App,
    VizualizareFilm,
    SupportPage,
    SupportAdmin,
    SupportForm,
    Faq,
    DetaliiCinema,
    Steps,
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
