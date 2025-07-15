import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VizualizareFilm } from './vizualizare-film/vizualizare-film';

import { Faq } from './Support/faq/faq';
import { SupportForm } from './Support/support-form/support-form';
import { SupportAdmin } from './Support/support-admin/support-admin';
import { SupportPage } from './Support/support-page/support-page';

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

  { path: 'support/faq', component: Faq },
  { path: 'support/form', component: SupportForm },
  { path: 'support/admin', component: SupportAdmin },
  { path: 'support', component: SupportPage },
  { path: 'vizualizare-film', component: VizualizareFilm },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
