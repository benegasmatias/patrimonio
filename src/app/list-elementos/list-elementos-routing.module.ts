import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListElementosComponent } from './list-elementos.component';

const routes: Routes = [{ path: '', component: ListElementosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
