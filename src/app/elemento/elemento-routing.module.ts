import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementoComponent } from './elemento.component';
import { ElementFormComponent } from './components/element-form/element-form.component';
import { Marca } from './model/marca';

const routes: Routes = [{ path: '', component: ElementoComponent,children:[
  {
    path:'add',
    component: ElementFormComponent
  },
  {
    path:'addMarca',
    component:Marca

  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementoRoutingModule { }
