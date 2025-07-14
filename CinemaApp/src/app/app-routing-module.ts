import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Register } from './register/register';


const routes: Routes = [
  // adaugă rutele tale
  {path: "login", component: LoginComponent},
  {path: "register", component: Register},
  {path: "", redirectTo: "/login", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }