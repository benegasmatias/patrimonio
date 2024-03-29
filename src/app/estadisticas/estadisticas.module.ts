import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './estadisticas.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {EstadisticasSalidaComponent} from './components/estadisticas-salidas/estadisticas-salida.component'
import {EstadisticasEntradaComponent} from './components/estadisticas-entradas/estadisticas-entrada.component'

@NgModule({
  declarations: [EstadisticasComponent, EstadisticasSalidaComponent,EstadisticasEntradaComponent],
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ]
})
export class EstadisticasModule { }
