import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from './../../services/tranferencias.service';
import { Beneficiario } from './../../models/Beneficiario';
import { Verificacion } from './../../models/Beneficiario';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { Transferencia } from 'src/app/models/Transferencia';
import {
  modalTranfClose,
  modalBeneficiarioClose,
  modalComprobanteOpen,
  modalComprobanteClose,
} from 'src/assets/modal.js';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-tranferencias-internas',
  templateUrl: './tranferencias-internas.component.html',
  styleUrls: ['./tranferencias-internas.component.css'],
})
export class TranferenciasInternasComponent implements OnInit {
  public nombrePropietario: string = '';
  public codigoVerificacion: string = '';
  public beneficiario: Beneficiario = new Beneficiario('', '', '', null);
  public beneficiarios: any[];
  public codigoEnviado: boolean = false;
  public codigoCorrecto: boolean = false;
  public codigoIncorrecto: boolean = false;
  public verificacion: Verificacion = new Verificacion('');
  public benefSelecNick: string = '';
  public benefSelecNumero: string = '';
  public idclienteSelec: string;
  public benefSelecNombre: string;
  public Cuentas: any[];
  public cuentaSaldo: number;
  public cuentaNumero: string = '';
  public secuencialCuenta: string = '';
  public Monto: string = '';
  public saldoInsuficiente: boolean = false;
  public transferencia: Transferencia;
  public numeroDocumentoRecibido: string = '';

  public errorMsg: string = '';

  public fecha: string = '';
  public hora: string = '';

  exportAsConfig: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'comprobanteTransferenciaInterna',
  }

  public v_obj: any;
  public v_fun: any;

  public cuentasAhorros: any[] = [];
  public variasCuentas: boolean = false;

  constructor(
    private _tranferenciaService: TransferenciaService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private userServices: UserService,
    private exportAsService: ExportAsService
  ) {
    this.nombrePropietario = userServices.usuario.getNombre;
  }

  ngOnInit(): void {
    this.getAllBeneficiarios();
    this.getCuenta();
    this.fecha = this.fechaActual();
    this.hora = this.horaActual();
  }

  selecciondeCuenta(): void {
    for (let i = 0; i < this.cuentasAhorros.length; i++) {
      if (this.secuencialCuenta == this.cuentasAhorros[i].secuencial) {
        this.cuentaSaldo = this.cuentasAhorros[i].cuentaSaldo;
        this.cuentaNumero = this.cuentasAhorros[i].cuentaNumero;
        this.secuencialCuenta = this.cuentasAhorros[i].secuencial;
        this.verificarSaldo()
      }
    }
  }

  getCuenta(): void {
    this.spinner.show();
    this.authService.callConsolidated().subscribe(
      (resp: any) => {
        this.spinner.hide();
        if (resp.cuentas) {
          this.Cuentas = resp.cuentas;
          var contador = 0;
          this.Cuentas.forEach((cue) => {
            if (cue.NombreTipoCuenta == 'Ahorros') {
              this.cuentasAhorros.push({ "cuentaSaldo": cue.Saldo, "cuentaNumero": cue.Codigo, "secuencial": cue.Secuencial, "tipo": cue.NombreTipoCuenta });
              if (contador == 0) {
                this.cuentaSaldo = cue.Saldo;
                this.cuentaNumero = cue.Codigo;
                this.secuencialCuenta = cue.Secuencial;
              }
              contador++;
            }
          });
          console.log(this.cuentasAhorros)
          if (contador > 1) {
            this.variasCuentas = true;
          } else {
            this.variasCuentas = false;
          }
        }
      }, (err) => {
        this.spinner.hide();
        console.log('Error TCC001');
      }
    );
  }

  mascara(o, f) {
    this.v_obj = o;
    this.v_fun = f;
    setTimeout(() => {
      this.execmascara()
    }, 2);
  }

  execmascara() {
    this.v_obj.Monto = this.v_fun(this.v_obj.Monto);
  }

  cpf(v) {
    v = v.replace(/([^0-9\.]+)/g, '');
    v = v.replace(/^[\.]/, '');
    v = v.replace(/[\.][\.]/g, '');
    v = v.replace(/\.(\d)(\d)(\d)/g, '.$1$2');
    v = v.replace(/\.(\d{1,2})\./g, '.$1');
    v = v.toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,');
    v = v.split('').reverse().join('').replace(/^[\,]/, '');
    return v;
  }

  descargarComprobante(): void {
    this.exportAsService.save(this.exportAsConfig, 'Comprobante de transferencia ' + this.numeroDocumentoRecibido).subscribe(() => {
    });
  }

  newCodigo($event): void {
    this.codigoVerificacion = $event;
    this.verificarCodigo();
  }

  closeModalTranfer(): void {
    modalTranfClose();
  }

  closeModalComprobante(): void {
    modalComprobanteClose();
    this.limpiarTransferencia();
  }

  horaActual(): string {
    var date: Date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  fechaActual(): string {
    var date: Date = new Date();
    var anio = date.getFullYear();
    var mes = +date.getMonth() + 1;
    var dia = date.getDate();

    if (mes < 10) {
      if (dia < 10) {
        return anio + '-0' + mes + '-0' + dia;
      } else {
        return anio + '-0' + mes + '-' + dia;
      }
    } else {
      if (dia < 10) {
        return anio + '-' + mes + '-0' + dia;
      } else {
        return anio + '-' + mes + '-' + dia;
      }
    }
  }

  realizarTransferencia(): void {
    this.spinner.show();
    if (this.Monto.split(",").length > 0) {
      this.Monto = this.Monto.replace(/,/g, "");
    }
    this.transferencia = new Transferencia(this.idclienteSelec, +this.Monto, this.secuencialCuenta);
    this.fecha = this.fechaActual();
    this.hora = this.horaActual();
    this._tranferenciaService.createTranferencia(this.transferencia).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (
          response.result.ProcesaTransferenciaInternaResult
            .EsRespuestaCorrecta == 'true'
        ) {
          this.numeroDocumentoRecibido =
            response.result.ProcesaTransferenciaInternaResult.NumeroDocumento;
          this.getCuenta();
          this.closeModalTranfer();
          modalComprobanteOpen();
        } else {
          Swal.fire(
            'Upss!! ha ocurrido un error en la transacción',
            response.result.ProcesaTransferenciaInternaResult.MensajeRespuesta,
            'error'
          );
        }
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Upss!! ha ocurrido un error en la transacción', '', 'error');
        console.log('Error TCRT001');
      }
    );
  }

  limpiarTransferencia(): void {
    this.Monto = '';
    this.benefSelecNombre = '';
    this.idclienteSelec = '';
    this.benefSelecNumero = '';
    this.benefSelecNick = '';
  }

  eliminarBeneficiario(id): void {
    this._tranferenciaService.deleteBeneficiario(id).subscribe(
      (response) => {
        Swal.fire('Beneficiario eliminado correctamente!!', '', 'success');
        this.getAllBeneficiarios();
      },
      (error) => {
        console.log('Error TCEB001');
        Swal.fire('Upss!! ha ocurrido un error.', '', 'error');
      }
    );
  }

  verificarSaldo(): void {
    let saldoDisponible = this.cuentaSaldo - 5;
    if (saldoDisponible < +this.Monto) {
      this.saldoInsuficiente = true;
    } else {
      this.saldoInsuficiente = false;
    }
  }


  seleccionBenedficiario(
    numeroCliente: string,
    nick: string,
    id: string,
    nombre: string
  ): void {
    this.benefSelecNick = nick;
    this.benefSelecNumero = numeroCliente;
    this.idclienteSelec = id;
    this.benefSelecNombre = nombre;
  }

  getAllBeneficiarios(): void {
    this.spinner.show();
    this._tranferenciaService.allBeneficiarios().subscribe(
      (response: any) => {
        this.beneficiarios = response.result;
        this.spinner.hide();
      },
      (error) => {
        console.log('Error TCAB001');
        this.spinner.hide();
      }
    );
  }

  agregarVeneficiario(): void {
    this.spinner.show();
    this._tranferenciaService.createBenficiario(this.beneficiario).subscribe(
      (response) => {
        this.spinner.hide();
        this.getAllBeneficiarios();
        this.limpiarCampos();
        Swal.fire('Beneficiario agregado correctamente!!', '', 'success');
        modalBeneficiarioClose();
        this.errorMsg = '';
      },
      (error) => {
        console.log(error);
        if (error.error.message) {
          this.errorMsg = error.error.message;
        }
        console.log('Error TCRB001');
        this.spinner.hide();
      }
    );
  }

  verificarCodigo(): void {
    this.spinner.show();
    this.verificacion.checker = this.codigoVerificacion;
    this._tranferenciaService.verificarCodigo(this.verificacion).subscribe(
      (response: any) => {
        if (response.ok == true) {
          this.codigoCorrecto = true;
          this.codigoIncorrecto = false;
        } else {
          this.codigoCorrecto = false;
          this.codigoIncorrecto = true;
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
        this.codigoIncorrecto = true;
      }
    );
  }

  solicitarCodigo(): void {
    this.spinner.show();
    this._tranferenciaService.solicitarCodigo().subscribe(
      (response) => {
        this.codigoEnviado = true;
        this.spinner.hide();
      }, (error) => {
        console.log('Error TCSC001');
        this.spinner.hide();
      }
    );
  }

  borrar(): void {
    this.codigoVerificacion = this.codigoVerificacion.substring(
      0,
      this.codigoVerificacion.length - 1
    );
  }

  limpiarCampos(): void {
    this.codigoVerificacion = '';
    var dirtyFormID = 'formBeneficiario';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }
}
