import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { ProgramCinema } from './program-cinema/program-cinema';

const routes: Routes = [
  {path: "", component:VizualizareFilm},
  // {path: "program-cinema", component:ProgramCinema},
  // {path: "recomandari", component:Recomandari},
  // {path: "profil-user", component:ProfilUser},
  // {path: "suport", component:Suport},
  // {path: "administrare", component:Administrare},
  // {path: "administrare-filme", component:AdministrareFilme},
  // {path: "administrare-sali", component:AdministrareSali},
  // {path: "administrare-promotii", component:AdministrarePromotii}
  {path: "login", component: Login},
  {path: "register", component: Register},
  {path: "vizualizare-film", component:VizualizareFilm},
  {path: "detalii-cinema", component:DetaliiCinema},
  {path: "program-cinema", component:ProgramCinema},

];
import { Login } from './login/login';
import { Register } from './register/register';




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }