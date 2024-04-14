import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IniciosSesionRoutingModule } from './inicios-sesion-routing.module';
import { IniciosSesionComponent } from './inicios-sesion.component';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';


@NgModule({
  declarations: [IniciosSesionComponent],
  imports: [
    CommonModule,
    IniciosSesionRoutingModule,
    SpinnerModule
  ]
})
export class IniciosSesionModule { }
