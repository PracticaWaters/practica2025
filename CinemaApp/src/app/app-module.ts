import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms'
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- importă aici
import { CommonModule } from '@angular/common';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { AppRoutingModule, RoutingComponent } from './app-routing-module';
import { App } from './app';
import { ScreeningRoomList } from './screening-room-operations/screening-room-list/screening-room-list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { AddScreeningRoom } from './screening-room-operations/add-screening-room/add-screening-room/add-screening-room';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    App,
    VizualizareFilm,
    DetaliiCinema,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    BrowserModule,
    MatExpansionModule,
    CommonModule,
    // CoreUI modules:
    NavbarModule,
    DropdownModule,
    CollapseModule,

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
  ],
  providers: [provideAnimations()],
  bootstrap: [App],
})
export class AppModule {}
