import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './estadisticas.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [EstadisticasComponent, ],
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    MatProgressSpinnerModule,
  ]
})
export class EstadisticasModule { }
