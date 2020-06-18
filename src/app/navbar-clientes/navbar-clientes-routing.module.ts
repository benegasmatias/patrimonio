import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarClientesComponent } from './navbar-clientes.component';

const routes: Routes = [{ path: '', component: NavbarClientesComponent },
{ path: 'clientes', loadChildren: () => import('../clientes/clientes.module').then(m => m.ClientesModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class NavbarClientesRoutingModule { }
