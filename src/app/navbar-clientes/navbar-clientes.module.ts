import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarClientesRoutingModule } from './navbar-clientes-routing.module';
import { NavbarClientesComponent } from './navbar-clientes.component';


@NgModule({
  declarations: [NavbarClientesComponent],
  imports: [
    CommonModule,
    NavbarClientesRoutingModule
  ],
  bootstrap: [NavbarClientesComponent]
})
export class NavbarClientesModule { }
