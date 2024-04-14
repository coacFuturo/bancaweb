import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimuladorAhorroprogramadoComponent } from './simulador-ahorroprogramado.component';

const routes: Routes = [
  {
    path: '',
    component: SimuladorAhorroprogramadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimuladorAhorroprogramadoRoutingModule { }
