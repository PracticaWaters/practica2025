import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';


const routes: Routes = [
  // adaugă rutele tale
  {path: "login", component: Login},
  {path: "register", component: Register},
  {path: "", redirectTo: "/login", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }