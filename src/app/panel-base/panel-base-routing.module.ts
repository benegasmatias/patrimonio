import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelBaseComponent } from './panel-base.component';

const routes: Routes = [
  {
    path: '', component: PanelBaseComponent,
    children: [
      { path: 'inicio', 
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioModule) },

      { path: 'logn', 
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
      {
        path: 'navbar',
        loadChildren: () => import('../navbar-clientes/navbar-clientes.module').then(m => m.NavbarClientesModule),
      },
      
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class PanelBaseRoutingModule { }
