import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeporteRoutingModule } from './deporte-routing.module';
import { DeporteComponent } from './deporte.component';
import { EditComponent } from './componets/edit/edit.component';
import { ListComponent } from './componets/list/list.component';


@NgModule({
  declarations: [DeporteComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    DeporteRoutingModule
  ]
})
export class DeporteModule { }
