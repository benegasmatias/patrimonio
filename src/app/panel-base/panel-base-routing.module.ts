import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelBaseComponent } from './panel-base.component';

const routes: Routes = [
  {
    path: '', component: PanelBaseComponent,
    children:
     [
     
      { path: 'inicio',  loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioModule) },
      { path: 'deporte',  loadChildren: () => import('../deporte/deporte.module').then(m => m.DeporteModule) }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class PanelBaseRoutingModule { }
