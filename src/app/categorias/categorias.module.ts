import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';

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

//import { DndModule } from "ngx-drag-drop";
import {DndListModule } from "ngx-drag-and-drop-lists";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { ContainerComponent } from './container/container.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [CategoriasComponent, ContainerComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule,
    MatInputModule,MatIconModule,MatSelectModule, MatCardModule, MatButtonModule, MatFormFieldModule/*, MaterialFileInputModule*/, MatListModule,MatDialogModule,MatExpansionModule,MatTreeModule,
    MatTreeModule, DragDropModule, MatSnackBarModule,DndListModule,MatMenuModule,MatToolbarModule
  ]
})
export class CategoriasModule { }
