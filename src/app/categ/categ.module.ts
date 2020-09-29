import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategRoutingModule } from './categ-routing.module';
import { CategComponent } from './categ.component';
import { DndListModule } from 'ngx-drag-and-drop-lists';

import { ContainerComponent } from './container/container.component'

@NgModule({
  declarations: [CategComponent, ContainerComponent],
  imports: [
    CommonModule,
    CategRoutingModule,DndListModule
  ]
})
export class CategModule { }
