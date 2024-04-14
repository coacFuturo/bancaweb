import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { interval } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { IpHistorial } from '../models/iphistorial';
import { Fechac } from '../services/FechaHora';
import { ObtenerdatosipService } from '../services/obtenerdatosip.service';
import { UserService } from '../services/user.service';
import { LeyProteccionDatosPersonalesService } from '../services/leyprotecciondatospersonales.service';
import { modalLeyProteccionDatosOpen, modalLeyProteccionDatosClose } from 'src/assets/modal.js';

@Component({
  selector: 'app-consolidate',
  templateUrl: './consolidate.component.html',
  styles: [],
})
export class ConsolidateComponent implements OnInit {
  public Cuentas: object;
  public CuentasBool: boolean = true;
  public CuentasB: boolean = true;
  public DepositosAPlazo: object;
  public Prestamos: object;
  public PrestamosGarantizados: object;
  public identificacion: string = '';

  public DataIp: IpHistorial = new IpHistorial(0, '', '', '', '', '');
  public ipServicioRequerido: any;

  @Output()
  //cuentas: EventEmitter<object> = new EventEmitter();
  prestamos: EventEmitter<object> = new EventEmitter();
  inversiones: EventEmitter<object> = new EventEmitter();

  public consolidado: boolean = true;
  public intervallTimer = interval(10000);
  private subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _router: Router,
    private _usuarioService: UserService,
    private _obtenerDatosIp: ObtenerdatosipService,
    private deviceService: DeviceDetectorService,
    private _leyproteccionDatosPersonalesService: LeyProteccionDatosPersonalesService
  ) {
    this.consolidate();
    this.identificacion = this._usuarioService.usuario.cedula;
    this.getDataIpCliente();
    this.verificarSiTienePermisosDatosPersonales();
  }

  verificarSiTienePermisosDatosPersonales(): void {
    this._leyproteccionDatosPersonalesService.verificarAceptacionDatosPersonal(this.identificacion).subscribe(
      response => {
        if (response.error) {
          modalLeyProteccionDatosOpen();
        }
      }, error => {
        console.log(error);
      }
    )
  }

  aceptarTratamientoDatosPersonales(): void {
    this._leyproteccionDatosPersonalesService.aceptarDatosPersonales(this.identificacion).subscribe(
      response => {
        modalLeyProteccionDatosClose();
      }, error => {
        console.log(error);
      }
    )
  }

  getDataIpCliente(): void {
    this._obtenerDatosIp.ipget().subscribe(
      response => {
        this.ipServicioRequerido = response;
        this.guardarHistorialIp();
      }, error => {
        console.log(error);
      }
    )
  }

  guardarHistorialIp(): void {
    this.DataIp.fecha_hora = Fechac.fechaActual() + ' ' + Fechac.horaActual();
    this.DataIp.ipns = this.ipServicioRequerido.ip;
    this.DataIp.ubicacion = this.ipServicioRequerido.city + ' - ' + this.ipServicioRequerido.region;
    this.DataIp.dispositivo = this.deviceService.getDeviceInfo().deviceType + ' ' + this.deviceService.getDeviceInfo().userAgent;
    this.DataIp.identificacion = this.identificacion;
    this._obtenerDatosIp.agregarVisitaUser(this.DataIp).subscribe(
      response => {
      }, error => {
        console.log(error);
      }
    )
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  async consolidate() {
    await this.authService.callConsolidated().subscribe(
      (resp: any) => {
        //console.log(resp)
        this.Cuentas = resp.cuentas;
        //this.cuentas.emit(this.Cuentas);
        this.CuentasB = false;
        this.DepositosAPlazo = resp.depositos;
        this.Prestamos = resp.prestamos;
        //this.PrestamosGarantizados =
        //  resp.DevuelveConsolidadoPorClienteResult.DatoConsolidado.PrestamosGarantizados;
      },
      (err) => {
        //Si sucede el error
        console.log('Error CCC001');
        //Swal.fire('Error', err.error.er.message, 'error');  
      }
    );
  }

  ngAfterViewInit() {
    this.loadScript('../assets/javascript/theme.js');
  }

  ngOnInit(): void {
    this.subscription = this.intervallTimer.subscribe(() => {
      if (this._router.url != '/register') {
        this.authService.validateToken().subscribe(
          (response: any) => { },
          (error) => {
            this._router.navigateByUrl('/login');
          }
        );
      }
    });
  }
}
