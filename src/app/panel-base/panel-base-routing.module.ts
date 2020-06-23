import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelBaseComponent } from './panel-base.component';

const routes: Routes = [
  {
    path: '', component: PanelBaseComponent,
    children: [
      { path: 'lista', loadChildren: () => import('../clientes/clientes.module').then(m => m.ClientesModule) },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelBaseRoutingModule { }
