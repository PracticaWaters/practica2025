import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetaliiCinema } from './detalii-cinema/detalii-cinema';

const routes: Routes = [

  {path: "detalii-cinema", component:DetaliiCinema },

];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [DetaliiCinema]