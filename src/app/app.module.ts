import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {AthInterceptor} from './_helpers/ath.interceptor'
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { DialogComponent } from './dialog/dialog/dialog.component'
import {MatDialogModule} from '@angular/material/dialog';
import { DialogProveedorComponent } from './dialog/proveedor/dialog-proveedor/dialog-proveedor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { StructComponent } from './components/struct/struct.component';
import { TypestructComponent } from './components/typestruct/typestruct.component';


import {dialogoNuevoStructComponent} from './panel-base/dialogoNuevoStruct/dialogoNuevoStruct.component'
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import {DatePipe} from '@angular/common';

import { PendingFormComponent } from './programa/componets/pending-form/pending-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    DialogProveedorComponent,
    StructComponent,
    TypestructComponent,
    dialogoNuevoStructComponent,
    PendingFormComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ], entryComponents: [
    DialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AthInterceptor, multi: true },
    DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
