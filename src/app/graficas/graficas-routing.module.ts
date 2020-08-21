import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficasComponent } from './graficas.component';
import { LineaComponent } from './components/linea/linea.component';
import { BarraComponent } from './components/barra/barra.component';
import { TortaComponent } from './components/torta/torta.component';

const routes: Routes = [{ path: '', component: GraficasComponent },
{path:'linea',component:LineaComponent},
{path:'barra',component:BarraComponent},
{path:'torta',component:TortaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficasRoutingModule { }
