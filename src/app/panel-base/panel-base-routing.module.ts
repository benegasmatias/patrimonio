import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelBaseComponent } from './panel-base.component';

const routes: Routes = [
  {
    path: '', component: PanelBaseComponent,
    children:
     [
      { path: 'logn', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
      { path: 'lista', loadChildren: () => import('../clientes/clientes.module').then(m => m.ClientesModule) },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: 'inicio',  loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioModule) }
      { path: 'nuevo-cliente', loadChildren: () => import('../nuevo-cliente/nuevo-cliente.module').then(m => m.NuevoClienteModule) },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class PanelBaseRoutingModule { }
