import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NuevoClienteRoutingModule } from './nuevo-cliente-routing.module';
import { NuevoClienteComponent } from './nuevo-cliente.component';


@NgModule({
  declarations: [NuevoClienteComponent],
  imports: [
    CommonModule,
    NuevoClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
}) 
export class NuevoClienteModule { }
