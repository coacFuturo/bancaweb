import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { ConsolidateComponent } from './consolidate.component';
import { CountsComponent } from './counts/counts.component';
import { LoanComponent } from './loan/loan.component';
import { InvestmentComponent } from './investment/investment.component';
import { SpinnerModule } from '../components/spinner/spinner.module';
import { ConsolidateRouting } from './consolidate-routing.module';
import { TranferenciasInternasComponent } from './tranferencias-internas/tranferencias-internas.component';
import { TranferenciasInterbancariasComponent } from './tranferencias-interbancarias/tranferencias-interbancarias.component';
import { SimuladorCreditoComponent } from './simulador-credito/simulador-credito.component';
import { ComprobantesComponent } from './comprobantes/comprobantes.component';
import {NgxPrintModule} from 'ngx-print';
import { SimuladorInversionesComponent } from './simulador-inversiones/simulador-inversiones.component';
import { FormVerificacionModule } from '../components/form-verificacion/form-verificacion.module';
import { FormVerificacionTraModule } from '../components/form-verificacion-tra/form-verificacion-tra.module';
import { ExportAsModule } from 'ngx-export-as';

@NgModule({
  declarations: [
    ConsolidateComponent,
    CountsComponent,
    LoanComponent,
    InvestmentComponent,
    TranferenciasInternasComponent,
    TranferenciasInterbancariasComponent,
    SimuladorCreditoComponent,
    ComprobantesComponent,
    SimuladorInversionesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ConsolidateRouting,
    SharedModule,
    SpinnerModule,
    NgxPrintModule,
    FormVerificacionModule,
    FormVerificacionTraModule,
    ExportAsModule
  ],
})
export class ConsolidateModule {}
