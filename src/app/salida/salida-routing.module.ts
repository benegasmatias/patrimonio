import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalidaComponent } from './salida.component';
import { SalidaListaComponent } from './components/salida-lista/salida-lista.component';
import { SalidaFormComponent } from './components/salida-form/salida-form.component';

const routes: Routes = [{ path: '', component: SalidaComponent,
children:[
     {path:'',component: SalidaListaComponent},
    {path:'addSalida',component:SalidaFormComponent}
      ]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalidaRoutingModule { }
