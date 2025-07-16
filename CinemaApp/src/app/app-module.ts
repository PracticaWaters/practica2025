import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AppRoot } from './app-root';
import { LoginComponent } from './login/login';
import { Register } from './register/register';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [App, Register, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch())  // ✅ Activează Fetch API
  ],
  bootstrap: [App],
})
export class AppModule {}
