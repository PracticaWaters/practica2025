import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';
import { ProgramCinema } from './program-cinema/program-cinema';

import { Faq } from './support/faq/faq';
import { SupportForm } from './support/support-form/support-form';
import { SupportAdmin } from './support/support-admin/support-admin';
import { SupportPage } from './support/support-page/support-page';
import { Reclama } from './Home/reclama/reclama';

const routes: Routes = [
  { path: '', component: VizualizareFilm },
  // {path: "program-cinema", component:ProgramCinema},
  // {path: "recomandari", component:Recomandari},
  // {path: "profil-user", component:ProfilUser},
  // {path: "suport", component:Suport},
  // {path: "administrare", component:Administrare},
  // {path: "administrare-filme", component:AdministrareFilme},
  // {path: "administrare-sali", component:AdministrareSali},
  // {path: "administrare-promotii", component:AdministrarePromotii}
  { path: 'detalii-cinema', component: DetaliiCinema },
  { path: 'program-cinema', component: ProgramCinema },
  { path: 'support/admin', component: SupportAdmin },
  { path: 'support', component: SupportPage },
  { path: 'vizualizare-film', component: VizualizareFilm },
  {path: 'reclama', component: Reclama}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
