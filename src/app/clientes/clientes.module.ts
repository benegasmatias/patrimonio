import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ListarclientesComponent } from './components/listarclientes/listarclientes.component';
import { PerfilclientesComponent } from './components/perfilclientes/perfilclientes.component';


@NgModule({
  declarations: [ClientesComponent, ListarclientesComponent,PerfilclientesComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientesModule { }
