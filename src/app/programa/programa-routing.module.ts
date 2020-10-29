import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramaComponent } from './programa.component';
import {ListComponent} from './componets/list/list.component'
import { ListInventariosComponent } from './componets/list-inventarios/list-inventarios.component';
import { ListSalidasComponent } from './componets/list-salidas/list-salidas.component';
import { ListPrestamosComponent } from './componets/list-prestamos/list-prestamos.component';


const routes: Routes = [
  { 
    path: '', component: ProgramaComponent,children:[
   { path: ':id', component:ListComponent},
   {path:'inventarios/:struct',component:ListInventariosComponent},
   {path:'salidas/:struct',component:ListSalidasComponent},
   {path:'prestamos/:struct',component:ListPrestamosComponent}


  ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaRoutingModule { }
