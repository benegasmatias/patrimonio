import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuscripcionesComponent } from './suscripciones.component';

const routes: Routes = [{ path: '', component: SuscripcionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuscripcionesRoutingModule { }
