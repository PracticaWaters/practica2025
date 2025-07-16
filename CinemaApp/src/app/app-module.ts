import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App } from './app';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- importă aici
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { AppRoutingModule } from './app-routing-module';
import { ScreeningRoomList } from './screening-room-operations/screening-room-list/screening-room-list';
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
import { SupportPage } from './Support/support-page/support-page';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportForm } from './Support/support-form/support-form';
import { Faq } from './Support/faq/faq';

@NgModule({
  declarations: [
    App,
    VizualizareFilm,
    DetaliiCinema,
    ScreeningRoomList,
    AddScreeningRoom,
    ScreeningRoom,
    SupportPage,
    SupportAdmin,
    SupportForm,
    Faq,
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
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [provideAnimations(), provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
