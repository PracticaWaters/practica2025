import { HttpClientModule } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { Faq } from './Support/faq/faq';
import { SupportForm } from './Support/support-form/support-form';
import { SupportPage } from './Support/support-page/support-page';

@NgModule({
  declarations: [App, SupportPage, Faq, SupportForm, SupportAdmin],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
