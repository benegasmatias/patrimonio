import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilClienteRoutingModule } from './perfil-cliente-routing.module';
import { PerfilClienteComponent } from './perfil-cliente.component';


import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [PerfilClienteComponent],
  imports: [
    CommonModule,
    PerfilClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,MatIconModule,MatSelectModule, MatCardModule, MatButtonModule
  ]
})
export class PerfilClienteModule { }
