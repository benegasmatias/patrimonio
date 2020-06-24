import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio.component';
import { authGuard } from '../login/authGuard';

const routes: Routes = [
  { path: '', component: InicioComponent },
{ 
  path: 'panel', 
 loadChildren: () => import('../panel-base/panel-base.module').then(m => m.PanelBaseModule),
 canActivate:[authGuard]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
