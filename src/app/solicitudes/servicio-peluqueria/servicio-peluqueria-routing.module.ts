import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioPeluqueriaComponent } from './servicio-peluqueria.component';

const routes: Routes = [
  {
    path: '',
    component: ServicioPeluqueriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioPeluqueriaRoutingModule { }
