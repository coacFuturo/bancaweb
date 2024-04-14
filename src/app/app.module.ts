import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './auth/register/register.component';
import { SpinnerModule } from './components/spinner/spinner.module';
import { NgxPrintModule } from 'ngx-print';
import { LoginComponent } from './auth/login/login.component';
import { FormVerificacionModule } from './components/form-verificacion/form-verificacion.module';
import { FacturaService } from './services/facturas.service';
import { ServicioTurnosService } from './services/servicioturnos.service';
import { VisitasService } from './services/visitas.service';
import { HorariosService } from './services/horarios.service';
import { SolicitudService } from './services/solicitud.service';
import { SucursalesService } from './services/sucursales.service';
import { BanersService } from './services/baners.service';
import { ObtenerdatosipService } from './services/obtenerdatosip.service';
import { EspecialidadesService } from './services/especialidades.service';
import { PersonaService } from './services/persona.service';
import { LeyProteccionDatosPersonalesService } from './services/leyprotecciondatospersonales.service';
import { CuentasService } from './services/cuentas.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SpinnerModule,
    NgxPrintModule,
    FormVerificacionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    appRoutingProviders,
    FacturaService,
    ServicioTurnosService,
    VisitasService,
    HorariosService,
    SolicitudService,
    SucursalesService,
    BanersService,
    ObtenerdatosipService,
    EspecialidadesService,
    PersonaService,
    LeyProteccionDatosPersonalesService,
    CuentasService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
