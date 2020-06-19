import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelBaseComponent } from './panel-base.component';

const routes: Routes = [{ path: '', component: PanelBaseComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelBaseRoutingModule { }
