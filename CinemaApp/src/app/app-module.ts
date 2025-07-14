import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SupportPage } from './support-page/support-page';
import { Faq } from './support-page/faq/faq';

@NgModule({
  declarations: [
    App,
    SupportPage,
    Faq
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
