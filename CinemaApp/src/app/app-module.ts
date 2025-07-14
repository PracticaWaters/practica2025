import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SupportPage } from './support-page/support-page';
import { Faq } from './support-page/faq/faq';
import { SupportForm } from './support-page/support-form/support-form';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    App,
    SupportPage,
    Faq,
    SupportForm,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatMenuModule,
<<<<<<< HEAD
    ReactiveFormsModule
=======
    HttpClientModule
>>>>>>> fa317557be9fc80615365b5cf764b5c7f2d5533e
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
