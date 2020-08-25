import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramaComponent } from './programa.component';
import {ListComponent} from './componets/list/list.component'
import {EditComponent} from './componets/edit/edit.component'
import { ListInventariosComponent } from './componets/list-inventarios/list-inventarios.component';
const routes: Routes = [
  { 
    path: '', component: ProgramaComponent,children:[
   { path: ':id', component:ListComponent},
   { path: 'edit', component:EditComponent},
   {path:'inventarios/:struct',component:ListInventariosComponent}]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaRoutingModule { }
