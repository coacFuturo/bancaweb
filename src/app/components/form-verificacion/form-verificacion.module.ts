import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormVerificacionComponent } from './form-verificacion.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormVerificacionComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[FormVerificacionComponent]
})
export class FormVerificacionModule { }
