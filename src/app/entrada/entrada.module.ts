import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradaRoutingModule } from './entrada-routing.module';
import { EntradaComponent } from './entrada.component';
import { EntradaFormComponent } from './components/entrada-form/entrada-form.component';
import {MatListModule} from '@angular/material/list'
import { ReactiveFormsModule,FormsModule} from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

import {ScrollingModule} from '@angular/cdk/scrolling';


import {MatButtonModule} from '@angular/material/button';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DialogCantElementComponent } from '../elemento/components/dialog-cant-element/dialog-cant-element.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [EntradaComponent, EntradaFormComponent,DialogCantElementComponent],
  imports: [
    CommonModule,
    EntradaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    ScrollingModule,
    MatButtonModule,
    AutocompleteLibModule,
    MatDialogModule
  ]
})
export class EntradaModule { }
