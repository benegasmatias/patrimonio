import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './list-elementos-routing.module';
import { ListElementosComponent } from './list-elementos.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatTreeModule} from '@angular/material/tree';
import {DragDropModule} from '@angular/cdk/drag-drop'; 

import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {FormElementosComponent} from './form-elementos/form-elementos.component';

@NgModule({
  declarations: [ListElementosComponent,FormElementosComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule,
    MatInputModule,MatIconModule,MatSelectModule, MatCardModule,MatButtonModule, 
    MatFormFieldModule/*, MaterialFileInputModule*/, MatListModule,MatDialogModule,
    MatExpansionModule,MatTreeModule,MatTreeModule, DragDropModule, MatSnackBarModule,
    MatTableModule,MatSortModule,MatPaginatorModule,
  ]
})
export class ListElementosModule { }
