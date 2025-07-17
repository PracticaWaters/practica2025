import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { ProgramCinema } from './program-cinema/program-cinema';
import { ScreeningRoom } from './screening-room/screening-room';
import { ScreeningRoomList } from './screening-room-operations/screening-room-list/screening-room-list';
import { AddScreeningRoom } from './screening-room-operations/add-screening-room/add-screening-room/add-screening-room';

import { Faq } from './Support/faq/faq';
import { SupportForm } from './Support/support-form/support-form';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportPage } from './Support/support-page/support-page';
import { TimeslotList } from './timeslot-operations/timeslot-list/timeslot-list';

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
  {path: "detalii-cinema", component:DetaliiCinema},
  {path: "program-cinema", component:ProgramCinema},
  { path: 'screening-room', component: ScreeningRoom },
  { path: 'screening-room-list', component: ScreeningRoomList },
  { path: 'add-screening-room/:id', component: AddScreeningRoom },
  { path: 'add-screening-room', component: AddScreeningRoom },
  {path: 'timeslot-list', component: TimeslotList},

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
