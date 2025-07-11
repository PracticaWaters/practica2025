import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FreqQuestionsComponent } from './support/freq-questions/freq-questions';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FreqQuestionsComponent  // 🔹 OK aici pentru că e standalone
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
