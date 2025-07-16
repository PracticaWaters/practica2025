import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';

import { App } from './app';
import { AppRoutingModule, RoutingComponent } from './app-routing-module';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { ScreeningRoomList } from './screening-room-operations/screening-room-list/screening-room-list';
import { AddScreeningRoom } from './screening-room-operations/add-screening-room/add-screening-room/add-screening-room';
import { ScreeningRoom } from './screening-room/screening-room'; 
import { ProgramCinema } from './program-cinema/program-cinema';

// Angular Material modules
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

// CoreUI modules and directives
import {
  NavbarModule,
  DropdownModule,
  CollapseModule,
  NavbarComponent,
  ContainerComponent,
  NavbarBrandDirective,
  NavbarTogglerDirective,
  CollapseDirective,
  NavbarNavComponent,
  NavItemComponent,
  DropdownComponent,
  DropdownToggleDirective,
  NavLinkDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
} from '@coreui/angular';

@NgModule({
  declarations: [
    App,
    VizualizareFilm,
    DetaliiCinema,
    ScreeningRoomList,
    AddScreeningRoom,
    ScreeningRoom, // ✅ adăugat pentru a evita eroarea ngFor
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,

    // Material
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,

    // CoreUI
    NavbarModule,
    DropdownModule,
    CollapseModule,
    NavbarComponent,
    ContainerComponent,
    NavbarBrandDirective,
    NavbarTogglerDirective,
    CollapseDirective,
    NavbarNavComponent,
    NavItemComponent,
    DropdownComponent,
    DropdownToggleDirective,
    NavLinkDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
  ],
  bootstrap: [App],
})
export class AppModule { }
