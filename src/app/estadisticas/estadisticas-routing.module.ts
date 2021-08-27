import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticasComponent } from './estadisticas.component';
import {EstadisticasSalidaComponent} from './components/estadisticas-salidas/estadisticas-salida.component'
import {EstadisticasEntradaComponent} from './components/estadisticas-entradas/estadisticas-entrada.component'

// const routes: Routes = [{ path: '', component: EstadisticasComponent }];

const routes: Routes = [
  {
    path: '', component: EstadisticasComponent,
    children:
     [
      {path:'salidas',component:EstadisticasSalidaComponent},
      {path:'entradas',component:EstadisticasEntradaComponent},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticasRoutingModule { }
