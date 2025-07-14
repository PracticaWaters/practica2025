import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatMenuModule} from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule, RoutingComponent } from './app-routing-module';
import { App } from './app';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';

@NgModule({
  declarations: [
    App,
    RoutingComponent,
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
