import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementoComponent } from './elemento.component';
import { ElementFormComponent } from './components/element-form/element-form.component';

const routes: Routes = [{ path: '', component: ElementoComponent,children:[
  {
    path:'addElement',
    component: ElementFormComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementoRoutingModule { }
