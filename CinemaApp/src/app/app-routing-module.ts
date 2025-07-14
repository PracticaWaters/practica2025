import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreeningRoom } from './screening-room/screening-room';
import { ScreeningRoomList } from './screening-room-operations/screening-room-list/screening-room-list';
import { AddScreeningRoom } from './screening-room-operations/add-screening-room/add-screening-room/add-screening-room';

const routes: Routes = [
  // {path: "", component:HomePage},
  // {path: "program-cinema", component:ProgramCinema},
  // {path: "recomandari", component:Recomandari},
  // {path: "profil-user", component:ProfilUser},
  // {path: "suport", component:Suport},
  // {path: "administrare", component:Administrare},
  // {path: "administrare-filme", component:AdministrareFilme},
  // {path: "administrare-sali", component:AdministrareSali},
  // {path: "administrare-promotii", component:AdministrarePromotii}
  { path: 'screening-room', component: ScreeningRoom },
  { path: 'screening-room-list', component: ScreeningRoomList },
  { path: 'add-screening-room', component: AddScreeningRoom },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponent = [ScreeningRoom];
