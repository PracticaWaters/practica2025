import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddScreeningRoom } from './screening-room-operations/add-screening-room/add-screening-room/add-screening-room';
import { ScreeningRoom } from './screening-room/screening-room';

// Angular Material modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- importă aici
import { App } from './app';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';

// Import CoreUI modules and directives:
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  CollapseDirective,
  CollapseModule,
  ContainerComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownModule,
  DropdownToggleDirective,
  NavbarBrandDirective,
  NavbarComponent,
  NavbarModule,
  NavbarNavComponent,
  NavbarTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
} from '@coreui/angular';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
// Import CoreUI modules and directives:
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ScreeningRoomList } from './screening-room-operations/screening-room-list/screening-room-list';
import { Bilete } from './user-dashboard/pages/bilete/bilete';
import { DetaliiPersonale } from './user-dashboard/pages/detalii-personale/detalii-personale';
import { PromptParolaComponent } from './user-dashboard/pages/detalii-personale/prompt-parola-component/prompt-parola-component';
import { MeniuPrincipal } from './user-dashboard/pages/meniu-principal/meniu-principal';
import { Review } from './user-dashboard/pages/review/review';
import { Wishlist } from './user-dashboard/pages/wishlist/wishlist';
import { UserDashboard } from './user-dashboard/user-dashboard';

import { Login } from './login/login';
import { Register } from './register/register';
import { Faq } from './Support/faq/faq';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportForm } from './Support/support-form/support-form';
import { SupportPage } from './Support/support-page/support-page';
import { TimeslotList } from './timeslot-operations/timeslot-list/timeslot-list';

@NgModule({
  declarations: [
    App,
    Register,
    Login,
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
    HttpClientModule,
    AppRoutingModule,

    // Material
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    CommonModule,
    MatInputModule,
    MatMenuModule,
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
    CommonModule,
    // CoreUI modules:
    NavbarModule,
    DropdownModule,
    CollapseModule,
    MatSelectModule,
    MatOptionModule,

    // CoreUI components and directives:
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
    MatOptionModule,
  ],

  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()), // ✅ Activează Fetch API
  ],
  bootstrap: [App],
})
export class AppModule {}
