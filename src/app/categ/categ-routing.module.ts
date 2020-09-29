import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategComponent } from './categ.component';

const routes: Routes = [{ path: '', component: CategComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategRoutingModule { }
