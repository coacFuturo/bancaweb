import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprobantesElectronicosRoutingModule } from './comprobantes-electronicos-routing.module';
import { ComprobantesElectronicosComponent } from './comprobantes-electronicos.component';
import { SpinnerModule } from '../components/spinner/spinner.module';


@NgModule({
  declarations: [ComprobantesElectronicosComponent],
  imports: [
    CommonModule,
    ComprobantesElectronicosRoutingModule,
    SpinnerModule
  ]
})
export class ComprobantesElectronicosModule { }
