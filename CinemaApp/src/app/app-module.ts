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
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
// Import CoreUI modules and directives:
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
import { UserDashboard } from './user-dashboard/user-dashboard';
import { MeniuPrincipal } from './user-dashboard/pages/meniu-principal/meniu-principal';
import { Wishlist } from './user-dashboard/pages/wishlist/wishlist';
import { Bilete } from './user-dashboard/pages/bilete/bilete';
import { Review } from './user-dashboard/pages/review/review';
import { DetaliiPersonale } from './user-dashboard/pages/detalii-personale/detalii-personale';
import { PromptParolaComponent } from './user-dashboard/pages/detalii-personale/prompt-parola-component/prompt-parola-component';
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

import { MatIconModule } from '@angular/material/icon';
import { SupportPage } from './Support/support-page/support-page';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportForm } from './Support/support-form/support-form';
import { Faq } from './Support/faq/faq';
import { RouterModule } from '@angular/router';
import { TimeslotList } from './timeslot-operations/timeslot-list/timeslot-list';


@NgModule({
  declarations: [
    App,
    VizualizareFilm,
    UserDashboard,
    MeniuPrincipal,
    Wishlist,
    Bilete,
    Review,
    DetaliiPersonale,
    PromptParolaComponent,
    DetaliiCinema,
    ScreeningRoomList,
    AddScreeningRoom,
    ScreeningRoom,
    SupportPage,
    SupportAdmin,
    SupportForm,
    Faq,
    TimeslotList,
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
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,

    // CoreUI modules:
    NavbarModule,
    DropdownModule,
    CollapseModule,

    // CoreUI components and directives:
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,

   
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
