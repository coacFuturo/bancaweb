import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimuladorAhorroprogramadoRoutingModule } from './simulador-ahorroprogramado-routing.module';
import { SimuladorAhorroprogramadoComponent } from './simulador-ahorroprogramado.component';
import { FormsModule } from '@angular/forms';
import { ExportAsModule } from 'ngx-export-as';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';


@NgModule({
  declarations: [SimuladorAhorroprogramadoComponent],
  imports: [
    CommonModule,
    SimuladorAhorroprogramadoRoutingModule,
    FormsModule,
    ExportAsModule,
    SpinnerModule
  ]
})
export class SimuladorAhorroprogramadoModule { }
