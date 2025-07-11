import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreqQuestionsComponent } from './support/freq-questions/freq-questions';

const routes: Routes = [
  { path: '', component: FreqQuestionsComponent } // ruta implicită afișează întrebările
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
