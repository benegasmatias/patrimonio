import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelBaseComponent } from './panel-base.component';

const routes: Routes = [
  {
    path: '', component: PanelBaseComponent,
    children:
     [
      { path: 'programa',  loadChildren: () => import('../programa/deporte.module').then(m => m.DeporteModule) },
      { path: 'elemento', loadChildren: () => import('../elemento/elemento.module').then(m => m.ElementoModule) },
      { path: 'salida', loadChildren: () => import('../salida/salida.module').then(m => m.SalidaModule) },
      { path: 'entrada', loadChildren: () => import('../entrada/entrada.module').then(m => m.EntradaModule) },
      { path:'graficas',loadChildren:()=>import('../graficas/graficas.module').then(m=>m.GraficasModule)},
      { path:'categorias',loadChildren:()=>import('../categorias/categorias.module').then(m=>m.CategoriasModule)}
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class PanelBaseRoutingModule { }
