import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioPeluqueriaRoutingModule } from './servicio-peluqueria-routing.module';
import { ServicioPeluqueriaComponent } from './servicio-peluqueria.component';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ServicioPeluqueriaComponent],
  imports: [
    CommonModule,
    ServicioPeluqueriaRoutingModule,
    SpinnerModule,
    FormsModule
  ]
})
export class ServicioPeluqueriaModule { }
