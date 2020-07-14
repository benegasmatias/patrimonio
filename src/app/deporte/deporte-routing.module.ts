import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeporteComponent } from './deporte.component';
import {ListComponent} from './componets/list/list.component'
import {EditComponent} from './componets/edit/edit.component'
const routes: Routes = [
  { 
    path: '', component: DeporteComponent,children:[
   { path: '', component:ListComponent},
   { path: 'edit', component:EditComponent}]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeporteRoutingModule { }
