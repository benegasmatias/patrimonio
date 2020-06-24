import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoClienteComponent } from './nuevo-cliente.component';

const routes: Routes = [{ path: '', component: NuevoClienteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevoClienteRoutingModule { }
