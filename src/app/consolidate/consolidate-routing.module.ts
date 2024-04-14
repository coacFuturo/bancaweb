import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { ConsolidateComponent } from './consolidate.component';
import { CountsComponent } from './counts/counts.component';
import { LoanComponent } from './loan/loan.component';
import { InvestmentComponent } from './investment/investment.component';
import { TranferenciasInternasComponent } from './tranferencias-internas/tranferencias-internas.component';
import { TranferenciasInterbancariasComponent } from './tranferencias-interbancarias/tranferencias-interbancarias.component';
import { SimuladorCreditoComponent } from './simulador-credito/simulador-credito.component';
import { SimuladorInversionesComponent } from './simulador-inversiones/simulador-inversiones.component';
import { ComprobantesComponent } from './comprobantes/comprobantes.component';

const routes: Routes = [
  {
    path: '',
    component: ConsolidateComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'cuentas', canActivate: [AuthGuard], component: CountsComponent },
      { path: 'prestamos', canActivate: [AuthGuard], component: LoanComponent },
      { path: 'inversiones', canActivate: [AuthGuard], component: InvestmentComponent },
      { path: 'tranferencias-internas', canActivate: [AuthGuard], component: TranferenciasInternasComponent },
      { path: 'tranferencias-interbancarias', canActivate: [AuthGuard], component: TranferenciasInterbancariasComponent },
      { path: 'simulador-credito', canActivate: [AuthGuard], component: SimuladorCreditoComponent },
      { path: 'simulador-inversiones', canActivate: [AuthGuard], component: SimuladorInversionesComponent },
      { path: 'comprobantes', canActivate: [AuthGuard], component: ComprobantesComponent },
      {
        path: 'simulador-ahorro-programado', canActivate: [AuthGuard],
        loadChildren: () => import('./simulador-ahorroprogramado/simulador-ahorroprogramado.module').then((m) => m.SimuladorAhorroprogramadoModule)
      },
      {
        path: 'facturas', canActivate: [AuthGuard],
        loadChildren: () => import('./../comprobantes-electronicos/comprobantes-electronicos.module').then((m) => m.ComprobantesElectronicosModule)
      },
      {
        path: 'servicio-odontologia', canActivate: [AuthGuard],
        loadChildren: () => import('./../solicitudes/servicio-odontologia/servicio-odontologia.module').then((m) => m.ServicioOdontologiaModule)
      },
      {
        path: 'servicio-peluqueria', canActivate: [AuthGuard],
        loadChildren: () => import('./../solicitudes/servicio-peluqueria/servicio-peluqueria.module').then((m) => m.ServicioPeluqueriaModule)
      },
      {
        path: 'medicina-general', canActivate: [AuthGuard],
        loadChildren: () => import('./../solicitudes/medicina-general/medicina-general.module').then((m) => m.MedicinaGeneralModule)
      },
      {
        path: 'inicios-sesion',
        loadChildren: () => import('./../micuenta/inicios-sesion/inicios-sesion.module').then((m) => m.IniciosSesionModule)
      },
      {
        path: 'cambiar-clave', canActivate: [AuthGuard],
        loadChildren: () => import('./../micuenta/cambiar-clave/cambiar-clave.module').then((m) => m.CambiarClaveModule)
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsolidateRouting { }
