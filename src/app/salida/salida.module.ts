import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalidaRoutingModule } from './salida-routing.module';
import { SalidaComponent } from './salida.component';
import { SalidaFormComponent } from './components/salida-form/salida-form.component';
import { SalidaListaComponent } from './components/salida-lista/salida-lista.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [SalidaComponent, SalidaFormComponent, SalidaListaComponent],
  imports: [
    CommonModule,
    SalidaRoutingModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,  
  ],
  providers:[
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SalidaModule { }
