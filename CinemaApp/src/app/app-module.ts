import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddScreeningRoom } from './screening-room-operations/add-screening-room/add-screening-room/add-screening-room';
import { ScreeningRoom } from './screening-room/screening-room';
import { ProgramCinema } from './program-cinema/program-cinema';

// Angular Material modules
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App } from './app';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- importă aici
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { MatCardModule } from '@angular/material/card';

// Import CoreUI modules and directives:
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
// Import CoreUI modules and directives:
import { UserDashboard } from './user-dashboard/user-dashboard';
import { MeniuPrincipal } from './user-dashboard/pages/meniu-principal/meniu-principal';
import { Wishlist } from './user-dashboard/pages/wishlist/wishlist';
import { Bilete } from './user-dashboard/pages/bilete/bilete';
import { Review } from './user-dashboard/pages/review/review';
import { DetaliiPersonale } from './user-dashboard/pages/detalii-personale/detalii-personale';
import { PromptParolaComponent } from './user-dashboard/pages/detalii-personale/prompt-parola-component/prompt-parola-component';
import { ScreeningRoomList } from './screening-room-operations/screening-room-list/screening-room-list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { SupportPage } from './Support/support-page/support-page';
import { Login } from './login/login';
import { Register } from './register/register';
import { Faq } from './Support/faq/faq';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportForm } from './Support/support-form/support-form';
import { CinemaModel } from './Home/cinema-model/cinema-model';
import { CinemaGenerator } from './Home/cinema-generator/cinema-generator';

import { RouterModule } from '@angular/router';
import { TimeslotList } from './timeslot-operations/timeslot-list/timeslot-list';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app-logic/token-interceptor';
import { Promotii } from './promotii/promotii';

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
    DetaliiCinema,
    CinemaModel,
    CinemaGenerator,
    TimeslotList,
    Promotii
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
    MatButtonModule,
    MatCardModule,

    // CoreUI components and directives:
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,

    CommonModule,

    MatSelectModule,
    MatOptionModule,

    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],

  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
//fgehufgnefw