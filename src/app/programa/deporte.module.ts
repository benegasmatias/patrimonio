import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeporteRoutingModule } from './deporte-routing.module';
import { DeporteComponent } from './deporte.component';
import { EditComponent } from './componets/edit/edit.component';
import { ListComponent } from './componets/list/list.component';
import {MatListModule} from '@angular/material/list'
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [DeporteComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    DeporteRoutingModule,
    MatListModule,MatDialogModule,MatButtonModule
  ]
})
export class DeporteModule { }
