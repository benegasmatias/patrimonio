import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
  { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'navbar-clientes', loadChildren: () => import('./navbar-clientes/navbar-clientes.module').then(m => m.NavbarClientesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
