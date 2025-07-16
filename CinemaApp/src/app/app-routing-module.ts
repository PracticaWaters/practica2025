import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { UserDashboard } from './user-dashboard/user-dashboard';
import { MeniuPrincipal } from './user-dashboard/pages/meniu-principal/meniu-principal';
import { Wishlist } from './user-dashboard/pages/wishlist/wishlist';
import { Bilete } from './user-dashboard/pages/bilete/bilete';
import { Review } from './user-dashboard/pages/review/review';
import { DetaliiPersonale } from './user-dashboard/pages/detalii-personale/detalii-personale';

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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
