import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeporteRoutingModule } from './deporte-routing.module';
import { DeporteComponent } from './deporte.component';
import { EditComponent } from './componets/edit/edit.component';
import { ListComponent } from './componets/list/list.component';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import { ListInventariosComponent } from './componets/list-inventarios/list-inventarios.component';
@NgModule({
  declarations: [DeporteComponent, EditComponent, ListComponent, ListInventariosComponent],
  imports: [
    CommonModule,
    DeporteRoutingModule,
    MatListModule,MatDialogModule,MatButtonModule,MatTableModule,CdkTableModule,MatInputModule,MatPaginatorModule,MatSortModule
  ]
})
export class DeporteModule { }
