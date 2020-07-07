import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { PagosComponent } from './pagos.component';

import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [PagosComponent],
  imports: [
    CommonModule,
    PagosRoutingModule,
    MatCardModule
  ]
})
export class PagosModule { }
