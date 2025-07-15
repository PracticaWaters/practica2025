import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SupportPage } from './Support/support-page/support-page';
import { Faq } from './Support/faq/faq';
import { SupportForm } from './Support/support-form/support-form';
import { ReactiveFormsModule } from '@angular/forms';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { FormsModule } from '@angular/forms'; 
import { NgModel } from '@angular/forms';


@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgModule
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
