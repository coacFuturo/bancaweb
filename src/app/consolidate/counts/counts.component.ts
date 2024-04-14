import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Cuenta, TipoCuentas } from 'src/app/models/Cuentas';
import { AuthService } from 'src/app/services/auth.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styles: [],
})
export class CountsComponent implements OnInit {
  public Cuentas: any[];
  public cuentaTipo: string = 'Ahorros';
  public cuentaSaldo: number;
  public cuentaProducto: string;
  public cuentaSecuencial: string;
  public cuentaCodigo;
  public cuentaEstado;
  public cuentaOficina;

  public ffin = new Date();
  public fini = new Date();
  public movements: Object;
  public movementsForm;
  public movementsEstado: string = 'esperando';

  public tipoCuentas: TipoCuentas[] = [];
  public secuencialCuentaPrincipal: number = null;
  public cuenta: Cuenta = new Cuenta(0, 0, '', '', '', '', '', '');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _cuentasService: CuentasService
  ) { }

  ngOnInit(): void {
    this.fini.setDate(this.ffin.getDate() - 5);
    this.fini = this.convertirFechas(this.fini);
    this.ffin = this.convertirFechas(this.ffin);
    //this.getCuentas();
    this.getTipoCuentas();
  }

  getTipoCuentas(): void {
    this._cuentasService.tiposCuentasDeCliente().subscribe(
      (response: any) => {
        this.tipoCuentas = response.response;
        this.secuencialCuentaPrincipal = null;
        for (let i = 0; i < this.tipoCuentas.length; i++) {
          if (this.tipoCuentas[i].codigo == '01                  ') {
            this.secuencialCuentaPrincipal = this.tipoCuentas[i].secuencial;
          } else if (this.tipoCuentas[i].codigo == '03                  ') {
            this.secuencialCuentaPrincipal = this.tipoCuentas[i].secuencial;
          } else if (this.tipoCuentas[i].codigo == '08                  ') {
            this.secuencialCuentaPrincipal = this.tipoCuentas[i].secuencial;
          } else {
            this.secuencialCuentaPrincipal = this.tipoCuentas[i].secuencial;
          }
        }
        this.getCuentaOne(this.secuencialCuentaPrincipal);
      }, error => {
        console.log(error);
      }
    )
  }

  getCuentaOne(secuencialCuenta: number): void {
    this._cuentasService.cuentaOne(secuencialCuenta).subscribe(
      (response: any) => {
        this.cuenta = response.response;
        this.cuentaTipo = this.cuenta.tipo;
        this.cuentaSaldo = this.cuenta.saldo;
        this.cuentaProducto = this.cuenta.nombreproducto;
        this.cuentaCodigo = this.cuenta.codigo;
        this.cuentaEstado = this.cuenta.estado;
        this.cuentaOficina = this.cuenta.oficina;
        this.cuentaSecuencial = this.cuenta.secuencial+'';
        this.movimientos(this.cuentaSecuencial, this.fini, this.ffin);
      }, error => {
        console.log(error);
      }
    )
  }

  getCuentas(): void {
    this.authService.callConsolidated().subscribe(
      (resp: any) => {
        console.log(resp)
        if (resp.cuentas) {
          this.Cuentas = resp.cuentas;
          var contador = 0;
          this.Cuentas.forEach((cue) => {
            if (cue.NombreTipoCuenta == 'Ahorros') {
              if (contador == 0) {
                this.cuentaTipo = cue.NombreTipoCuenta;
                this.cuentaSaldo = cue.Saldo;
                this.cuentaProducto = cue.NombreProductoVista;
                this.cuentaCodigo = cue.Codigo;
                this.cuentaEstado = cue.NombreEstado;
                this.cuentaOficina = cue.NombreOficina;
                this.cuentaSecuencial = cue.Secuencial;
                this.movimientos(this.cuentaSecuencial, this.fini, this.ffin);
              }
              contador++;
            }
          });
        }
      },
      (err) => {
        console.log('ERROR COUCC001');
      }
    );
  }

  scanerCuentas(secuencial) {
    try {
      this.Cuentas.forEach((cue) => {
        if (cue.Secuencial == secuencial) {
          this.cuentaTipo = cue.NombreTipoCuenta;
          this.cuentaSaldo = cue.Saldo;
          this.cuentaProducto = cue.NombreProductoVista;
          this.cuentaCodigo = cue.Codigo;
          this.cuentaEstado = cue.NombreEstado;
          this.cuentaOficina = cue.NombreOficina;
          this.cuentaSecuencial = cue.Secuencial;
          this.movimientos(this.cuentaSecuencial, this.fini, this.ffin);
        }
      });
    } catch (error) {
      console.log('ERROR COUCC002');
    }
  }

  convertirFechas(fecha: Date): any {
    var event = new Date(fecha);
    let date = JSON.stringify(event);
    date = date.slice(1, 11);
    return date;
  }

  movimientos(secuencial: string, fini: Date, ffin: Date): void {
    var url = 'movimientoc';
    fini = this.convertirFechas(fini);
    ffin = this.convertirFechas(ffin);
    this.movementsForm = this.fb.group({
      tipo: 'cuenta',
      secuencial: secuencial,
      fini: fini,
      ffin: ffin,
    });
    this.movementsEstado = 'esperando';
    this.authService.movimiento(this.movementsForm.value, url).subscribe(
      (resp: any) => {
        if (resp.result.DevuelveMovimientoCuentaPorSecuencialResult.DatoMovimientos.MovimientosCuentaResumen) {
          this.movements = resp.result.DevuelveMovimientoCuentaPorSecuencialResult.DatoMovimientos.MovimientosCuentaResumen.MovimientoCuentaResumen;
          if (resp.result.DevuelveMovimientoCuentaPorSecuencialResult.DatoMovimientos.MovimientosCuentaResumen.MovimientoCuentaResumen.length) {
            this.movements = resp.result.DevuelveMovimientoCuentaPorSecuencialResult.DatoMovimientos.MovimientosCuentaResumen.MovimientoCuentaResumen;
          } else {
            this.movements = [
              resp.result.DevuelveMovimientoCuentaPorSecuencialResult
                .DatoMovimientos.MovimientosCuentaResumen
                .MovimientoCuentaResumen,
            ];
          }

          this.movementsEstado = 'con-datos';
        } else {
          this.movements = null;
          this.movementsEstado = 'sin-datos';
        }
      },
      (err) => {
        console.log('ERROR COUCM001');
      }
    );
  }

  buscar(): void {
    this.movimientos(
      this.cuentaSecuencial,
      new Date(this.fini),
      new Date(this.ffin)
    );
  }

  mascaraFechas(fecha: Date): any {
    var event = new Date(fecha);
    let date = JSON.stringify(event)
    date = date.slice(1, 11)
    return date;
  }
}
