import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
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

<<<<<<< HEAD
import { Faq } from './support/faq/faq';
import { SupportForm } from './support/support-form/support-form';
import { SupportAdmin } from './support/support-admin/support-admin';
import { SupportPage } from './support/support-page/support-page';
import { Reclama } from './Home/reclama/reclama';
=======
import { Faq } from './Support/faq/faq';
import { SupportForm } from './Support/support-form/support-form';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportPage } from './Support/support-page/support-page';
import { Promotii } from './promotii/promotii';
import { CinemaModel } from './Home/cinema-model/cinema-model';
import { CinemaGenerator } from './Home/cinema-generator/cinema-generator';
import { TimeslotList } from './timeslot-operations/timeslot-list/timeslot-list';
import { AddTimeslot } from './timeslot-operations/add-timeslot/add-timeslot';
import { SelectMovie } from './timeslot-operations/add-timeslot/select-movie/select-movie';
import { SelectScreeningRoom } from './timeslot-operations/add-timeslot/select-screening-room/select-screening-room';
>>>>>>> main

const routes: Routes = [
  { path: '', component: CinemaModel },
  // {path: "program-cinema", component:ProgramCinema},
  // {path: "recomandari", component:Recomandari},
  // {path: "profil-user", component:ProfilUser},
  // {path: "suport", component:Suport},
  // {path: "administrare", component:Administrare},
  // {path: "administrare-filme", component:AdministrareFilme},
  // {path: "administrare-promotii", component:AdministrarePromotii}
  {
    path: 'userdashboard',
    component: UserDashboard,
    children: [
      { path: '', redirectTo: 'detalii', pathMatch: 'full' },
      // { path: 'meniu-principal', component: MeniuPrincipal },
      { path: 'wishlist', component: Wishlist },
      { path: 'bilete', component: Bilete },
      { path: 'review-uri', component: Review },
      { path: 'detalii', component: DetaliiPersonale },
    ],
  },
  { path: 'detalii-cinema', component: DetaliiCinema },
  { path: 'program-cinema', component: ProgramCinema },
  { path: 'screening-room', component: ScreeningRoom },
  { path: 'screening-room-list', component: ScreeningRoomList },
  { path: 'add-screening-room/:id', component: AddScreeningRoom },
  { path: 'add-screening-room', component: AddScreeningRoom },
  {path: 'timeslot-list', component: TimeslotList},
  {path: 'add-timeslot',component: AddTimeslot},
  {path: 'add-timeslot/:id',component: AddTimeslot},
  {path: 'select-movie', component:SelectMovie},
  {path: 'select-screening-room', component:SelectScreeningRoom},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'timeslot-list', component: TimeslotList },
  { path: 'detalii-cinema', component: DetaliiCinema },
  { path: 'program-cinema', component: ProgramCinema },
  { path: 'cinema-model', component: CinemaModel },
  { path: 'cinema-generator', component: CinemaGenerator },
  { path: 'support/admin', component: SupportAdmin },
  { path: 'support', component: SupportPage },
  { path: 'vizualizare-film', component: VizualizareFilm },
<<<<<<< HEAD
  {path: 'reclama', component: Reclama}
=======
  { path: 'promotii', component: Promotii}
>>>>>>> main
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
