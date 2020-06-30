import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NuevoClienteRoutingModule } from './nuevo-cliente-routing.module';
import { NuevoClienteComponent } from './nuevo-cliente.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [NuevoClienteComponent],
  imports: [
    CommonModule,
    NuevoClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,MatIconModule,MatSelectModule, MatCardModule, MatButtonModule
  ]
}) 
export class NuevoClienteModule { }
