import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuscripcionesRoutingModule } from './suscripciones-routing.module';
import { SuscripcionesComponent } from './suscripciones.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [SuscripcionesComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    SuscripcionesRoutingModule
  ]
})
export class SuscripcionesModule { }
