import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent}from './login/login.component';

import { authGuard } from './login/authGuard';
import { authlogin } from './login/authlogin';


const routes: Routes = [{
  path:'',
  component:LoginComponent,
  canActivate:[authlogin]},
  { 
      path: 'navbar',
      loadChildren: () => import('./navbar-clientes/navbar-clientes.module').then(m => m.NavbarClientesModule),
      canActivate:[authGuard]
    },
  {path: 'logn', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'panel', loadChildren: () => import('./panel-base/panel-base.module').then(m => m.PanelBaseModule)
  }]
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
