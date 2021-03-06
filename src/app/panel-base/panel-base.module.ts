
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

import { PanelBaseRoutingModule } from './panel-base-routing.module';
import { PanelBaseComponent } from './panel-base.component';

import {MatDialogModule} from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [PanelBaseComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    PanelBaseRoutingModule,
    MatSidenavModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,MatInputModule,
  ]
})
export class PanelBaseModule { }
