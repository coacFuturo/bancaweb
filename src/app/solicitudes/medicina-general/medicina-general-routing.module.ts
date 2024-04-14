import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicinaGeneralComponent } from './medicina-general.component';

const routes: Routes = [
  {
    path: '',
    component: MedicinaGeneralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinaGeneralRoutingModule { }
