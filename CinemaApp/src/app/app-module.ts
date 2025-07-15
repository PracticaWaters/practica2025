import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { ProgramCinema } from './program-cinema/program-cinema';


@NgModule({
  declarations: [
    App,
    VizualizareFilm,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ProgramCinema
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
