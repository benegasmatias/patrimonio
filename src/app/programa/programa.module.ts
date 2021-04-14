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


import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import { ListInventariosComponent } from './componets/list-inventarios/list-inventarios.component';
import { ListSalidasComponent } from './componets/list-salidas/list-salidas.component';
import { ConfigComponent } from './componets/config/config.component';
import { ListPrestamosComponent } from './componets/list-prestamos/list-prestamos.component';
import {PdfService} from './componets/list-prestamos/pdfService/pdfService';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {pdfServiceSalida} from './componets/list-salidas/pdfServiceSalida/pdfServiceSalida';
import{ MatIconModule} from '@angular/material/icon';

import {ReactiveFormsModule} from '@angular/forms'; 
@NgModule({
  declarations: [ProgramaComponent, ListComponent, ListInventariosComponent,ListSalidasComponent,ListPrestamosComponent,ConfigComponent],
  imports: [
    CommonModule,
    ProgramaRoutingModule,
    MatListModule,MatDialogModule,MatButtonModule,MatTableModule,CdkTableModule,MatInputModule,MatPaginatorModule,MatSortModule
    ,MatDatepickerModule,ReactiveFormsModule,MatIconModule,MatFormFieldModule
  ],
  providers:[
    PdfService,
    pdfServiceSalida
  ]
})
export class ProgramaModule { }
