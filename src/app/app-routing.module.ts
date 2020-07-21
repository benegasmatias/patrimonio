import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent}from './login/login.component';

import { authGuard } from './login/authGuard';
import { authlogin } from './login/authlogin';

import {PanelBaseComponent} from '../app/panel-base/panel-base.component'


const routes: Routes = [{
  path:'',
  component:LoginComponent, loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  canActivate:[authlogin]},
  { 
  // path: 'panel', loadChildren: () => import('./panel-base/panel-base.module').then(m => m.PanelBaseModule), canActivate:[authGuard]},
   path: 'panel', loadChildren: () => import('./panel-base/panel-base.module').then(m => m.PanelBaseModule)},
 
  ]
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap:[PanelBaseComponent]
})
export class AppRoutingModule { }
