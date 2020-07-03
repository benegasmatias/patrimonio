import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent}from './login/login.component';

import { authGuard } from './login/authGuard';
import { authlogin } from './login/authlogin';

import {PanelBaseComponent} from '../app/panel-base/panel-base.component'


const routes: Routes = [{
  path:'',
  component:LoginComponent,
  canActivate:[authlogin]},
  { 
   path: 'panel', loadChildren: () => import('./panel-base/panel-base.module').then(m => m.PanelBaseModule), canActivate:[authGuard]},
   //path: 'panel', loadChildren: () => import('./panel-base/panel-base.module').then(m => m.PanelBaseModule)},
  { path: 'suscripciones', loadChildren: () => import('./suscripciones/suscripciones.module').then(m => m.SuscripcionesModule) }
  ]
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap:[PanelBaseComponent]
})
export class AppRoutingModule { }
