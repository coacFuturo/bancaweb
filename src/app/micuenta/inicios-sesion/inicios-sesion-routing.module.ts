import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciosSesionComponent } from './inicios-sesion.component';

const routes: Routes = [
  {
    path:'',
    component: IniciosSesionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IniciosSesionRoutingModule { }
