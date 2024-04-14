import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CambiarClaveRoutingModule } from './cambiar-clave-routing.module';
import { CambiarClaveComponent } from './cambiar-clave.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CambiarClaveComponent],
  imports: [
    CommonModule,
    CambiarClaveRoutingModule,
    FormsModule
  ]
})
export class CambiarClaveModule { }
