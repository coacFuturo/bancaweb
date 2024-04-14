import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormVerificacionComponent } from '../form-verificacion/form-verificacion.component';
import { FormsModule } from '@angular/forms';
import { FormVerificacionTraComponent } from './form-verificacion-tra.component';



@NgModule({
  declarations: [FormVerificacionTraComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormVerificacionTraComponent]
})
export class FormVerificacionTraModule { }
