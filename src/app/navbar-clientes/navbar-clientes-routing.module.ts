import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarClientesComponent } from './navbar-clientes.component';

const routes: Routes = [{ path: '', component: NavbarClientesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarClientesRoutingModule { }
