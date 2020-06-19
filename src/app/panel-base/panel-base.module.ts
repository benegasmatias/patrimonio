
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

import { PanelBaseRoutingModule } from './panel-base-routing.module';
import { PanelBaseComponent } from './panel-base.component';

@NgModule({
  declarations: [PanelBaseComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    PanelBaseRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ]
})
export class PanelBaseModule { }
