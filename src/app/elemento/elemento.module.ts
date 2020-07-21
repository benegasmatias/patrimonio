import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementoRoutingModule } from './elemento-routing.module';
import { ElementoComponent } from './elemento.component';

import { ElementFormComponent } from './components/element-form/element-form.component';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';

import { ReactiveFormsModule } from '@angular/forms';
import { MarcaComponent } from './components/marca/marca.component';

import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [ElementoComponent, ElementFormComponent, MarcaComponent],
  imports: [
    CommonModule,
    ElementoRoutingModule,MatCardModule,MatInputModule,MatIconModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,MatChipsModule,MatDialogModule


  ]
})
export class ElementoModule { }
