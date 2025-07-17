import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PromptParolaComponent } from './user-dashboard/pages/detalii-personale/prompt-parola-component/prompt-parola-component';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { SupportPage } from './Support/support-page/support-page';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportForm } from './Support/support-form/support-form';
import { Faq } from './Support/faq/faq';


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
    SupportPage,
    SupportAdmin,
    SupportForm,
    Faq,
    DetaliiCinema,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    MatInputModule,
    MatMenuModule,
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,

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
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [provideAnimations()],
  bootstrap: [App],
})
export class AppModule {}
