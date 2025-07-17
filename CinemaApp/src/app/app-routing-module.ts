import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { UserDashboard } from './user-dashboard/user-dashboard';
import { MeniuPrincipal } from './user-dashboard/pages/meniu-principal/meniu-principal';
import { Wishlist } from './user-dashboard/pages/wishlist/wishlist';
import { Bilete } from './user-dashboard/pages/bilete/bilete';
import { Review } from './user-dashboard/pages/review/review';
import { DetaliiPersonale } from './user-dashboard/pages/detalii-personale/detalii-personale';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { ProgramCinema } from './program-cinema/program-cinema';
import { ScreeningRoom } from './screening-room/screening-room';
import { ScreeningRoomList } from './screening-room-operations/screening-room-list/screening-room-list';
import { AddScreeningRoom } from './screening-room-operations/add-screening-room/add-screening-room/add-screening-room';

import { Faq } from './Support/faq/faq';
import { SupportForm } from './Support/support-form/support-form';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportPage } from './Support/support-page/support-page';

const routes: Routes = [
  { path: '', component: VizualizareFilm },
  // {path: "program-cinema", component:ProgramCinema},
  // {path: "recomandari", component:Recomandari},
  // {path: "profil-user", component:ProfilUser},
  // {path: "suport", component:Suport},
  // {path: "administrare", component:Administrare},
  // {path: "administrare-filme", component:AdministrareFilme},
  // {path: "administrare-promotii", component:AdministrarePromotii}
  {path: "vizualizare-film", component:VizualizareFilm},
  {
    path: 'userdashboard',
    component: UserDashboard,
    children: [
      { path: '', redirectTo: 'meniu-principal', pathMatch: 'full' },
      { path: 'meniu-principal', component: MeniuPrincipal },
      { path: 'wishlist', component: Wishlist },
      { path: 'bilete', component: Bilete },
      { path: 'review-uri', component: Review },
      { path: 'detalii', component: DetaliiPersonale }
    ]
  },
  {path: "detalii-cinema", component:DetaliiCinema},
  {path: "program-cinema", component:ProgramCinema},
  { path: 'screening-room', component: ScreeningRoom },
  { path: 'screening-room-list', component: ScreeningRoomList },
  { path: 'add-screening-room/:id', component: AddScreeningRoom },
  { path: 'add-screening-room', component: AddScreeningRoom },
  { path: 'detalii-cinema', component: DetaliiCinema },
  { path: 'program-cinema', component: ProgramCinema },
  { path: 'support/admin', component: SupportAdmin },
  { path: 'support', component: SupportPage },
  { path: 'vizualizare-film', component: VizualizareFilm },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
