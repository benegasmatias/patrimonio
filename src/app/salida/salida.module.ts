import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalidaRoutingModule } from './salida-routing.module';
import { SalidaComponent } from './salida.component';
import { SalidaFormComponent } from './components/salida-form/salida-form.component';
import { SalidaListaComponent } from './components/salida-lista/salida-lista.component';


@NgModule({
  declarations: [SalidaComponent, SalidaFormComponent, SalidaListaComponent],
  imports: [
    CommonModule,
    SalidaRoutingModule
  ]
})
export class SalidaModule { }
