import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent}from './login/login.component';

import { authGuard } from './login/authGuard';
import { authlogin } from './login/authlogin';

import {PanelBaseComponent} from '../app/panel-base/panel-base.component'
import {LoginService} from '../app/login/services/login.service';
import { LoginModule } from './login/login.module';

const routes: Routes = [{
  path:'',
  component:LoginComponent, loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  canActivate:[authlogin]},
  { 
   // path: 'panel', loadChildren: () => import('./panel-base/panel-base.module').then(m => m.PanelBaseModule)},
   path: 'panel', loadChildren: () => import('./panel-base/panel-base.module').then(m => m.PanelBaseModule), canActivate:[authGuard]},
  { path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule),canActivate:[authGuard] }
   
  ]
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap:[PanelBaseComponent],

})
export class AppRoutingModule { }
