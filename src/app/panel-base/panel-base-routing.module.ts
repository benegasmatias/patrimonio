import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelBaseComponent } from './panel-base.component';
import { authGuard } from '../login/authGuard';

const routes: Routes = [
  {
    path: '', component: PanelBaseComponent,
    children:
     [
      { path: 'programa',  loadChildren: () => import('../programa/programa.module').then(m => m.ProgramaModule),canActivate:[authGuard] },
      { path: 'elemento', loadChildren: () => import('../elemento/elemento.module').then(m => m.ElementoModule),canActivate:[authGuard] },
      { path: 'salida', loadChildren: () => import('../salida/salida.module').then(m => m.SalidaModule),canActivate:[authGuard] },
      { path: 'entrada', loadChildren: () => import('../entrada/entrada.module').then(m => m.EntradaModule),canActivate:[authGuard] },
      { path:'categorias',loadChildren:()=>import('../categorias/categorias.module').then(m=>m.CategoriasModule),canActivate:[authGuard]},
      { path:'list-elementos',loadChildren:()=>import('../list-elementos/list-elementos.module').then(m=>m.ListElementosModule),canActivate:[authGuard]},
      { path:'estadisticas',loadChildren:()=>import('../estadisticas/estadisticas.module').then(m=>m.EstadisticasModule),canActivate:[authGuard]},

    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class PanelBaseRoutingModule { }
