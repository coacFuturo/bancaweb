import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioOdontologiaRoutingModule } from './servicio-odontologia-routing.module';
import { ServicioOdontologiaComponent } from './servicio-odontologia.component';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ServicioOdontologiaComponent],
  imports: [
    CommonModule,
    ServicioOdontologiaRoutingModule,
    SpinnerModule,
    FormsModule
  ]
})
export class ServicioOdontologiaModule { }
