import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprobantesElectronicosComponent } from './comprobantes-electronicos.component';

const routes: Routes = [
  {
    path: '',
    component: ComprobantesElectronicosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprobantesElectronicosRoutingModule { }
