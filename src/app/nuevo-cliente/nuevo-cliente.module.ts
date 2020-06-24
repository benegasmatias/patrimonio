import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { NuevoClienteRoutingModule } from './nuevo-cliente-routing.module';
import { NuevoClienteComponent } from './nuevo-cliente.component';


@NgModule({
  declarations: [NuevoClienteComponent],
  imports: [
    CommonModule,
    NuevoClienteRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
}) 
export class NuevoClienteModule { }
