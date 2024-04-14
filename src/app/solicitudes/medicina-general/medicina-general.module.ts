import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicinaGeneralRoutingModule } from './medicina-general-routing.module';
import { MedicinaGeneralComponent } from './medicina-general.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MedicinaGeneralComponent
  ],
  imports: [
    CommonModule,
    MedicinaGeneralRoutingModule,
    FormsModule
  ]
})
export class MedicinaGeneralModule { }
