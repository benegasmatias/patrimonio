import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramaRoutingModule } from './programa-routing.module';
import { ProgramaComponent } from './programa.component';
import { ListComponent } from './componets/list/list.component';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatTableModule} from '@angular/material/table';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import { ListInventariosComponent } from './componets/list-inventarios/list-inventarios.component';
import { ListSalidasComponent } from './componets/list-salidas/list-salidas.component';
import { ListPrestamosComponent } from './componets/list-prestamos/list-prestamos.component';


@NgModule({
  declarations: [ProgramaComponent, ListComponent, ListInventariosComponent,ListSalidasComponent,ListPrestamosComponent],
  imports: [
    CommonModule,
    ProgramaRoutingModule,
    MatListModule,MatDialogModule,MatButtonModule,MatTableModule,CdkTableModule,MatInputModule,MatPaginatorModule,MatSortModule
  ]
})
export class ProgramaModule { }
