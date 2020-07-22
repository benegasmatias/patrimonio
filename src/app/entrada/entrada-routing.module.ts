import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntradaComponent } from './entrada.component';
import { EntradaFormComponent } from './components/entrada-form/entrada-form.component';

const routes: Routes = [{ path: '', component: EntradaComponent,children:[
  {path:'add',
component:EntradaFormComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaRoutingModule { }
