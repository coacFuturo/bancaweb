import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Verificacion } from 'src/app/models/Beneficiario';
import { BeneficiarioInter } from '../../models/BeneficiarioInter';
import { TransferenciaService } from '../../services/tranferencias.service';
import {
  modalBeneficiarioRegiIClose,
  modalTranfIntClose,
  modalComprobanteIntOpen,
  modalComprobanteIntClose,
} from 'src/assets/modal.js';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { TransferenciaInt } from 'src/app/models/TransferenciaInt';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-tranferencias-interbancarias',
  templateUrl: './tranferencias-interbancarias.component.html',
  styleUrls: ['./tranferencias-interbancarias.component.css'],
})
export class TranferenciasInterbancariasComponent implements OnInit {
  public nombrePropietario: string = '';
  public beneficiarioIn: BeneficiarioInter = new BeneficiarioInter('', '', '', '', '', '', '', '', '', '');
  public tipoCuentas: any[];
  public conceptos: any[];
  public tipoInstitucion: any[];
  public tipoI: string = '';
  public instituciones: any[];
  public codigoVerificacion: string = '';
  public verificacion: Verificacion = new Verificacion('');
  public codigoEnviado: boolean = false;
  public beneficiariosIn: BeneficiarioInter[];
  public benefSelecNumero: string = '';
  public idclienteSelec: string;
  public benefSelecNombre: string = '';
  public cuentaSaldo: number;
  public Cuentas: any[];
  public cuentaNumero: string = '';
  public secuencialCuenta: string = '';
  public saldoInsuficiente: boolean = false;
  public transferencia: TransferenciaInt = new TransferenciaInt('', null, '', '');
  public numeroDocumentoRecibido: string = '';
  public documentoComision: string = '';
  public conceptopTransferencia: string = '';
  public institucionDestino: string = '';
  public cedulaEstado: boolean = true;
  public txtName: string = '';
  public codigoIncorrecto: boolean = false;
  public codigoCorrecto: boolean = false;
  public fecha: string = '';
  public hora: string = '';

  public v_obj: any;
  public v_fun: any;

  public cuentasAhorros: any[] = [];
  public variasCuentas: boolean = false;

  exportAsConfig: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'comprobanteTransferenciaInterban',
  }

  constructor(
    private _transferenciaService: TransferenciaService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private userServices: UserService,
    private exportAsService: ExportAsService
  ) {
    this.nombrePropietario = userServices.usuario.getNombre;
  }

  ngOnInit(): void {
    this.getTipoCuentas();
    this.getConceptos();
    this.getTipoInstitucion();
    this.getAllbeneficiariosIn();
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

  mascara(o, f) {
    this.v_obj = o;
    this.v_fun = f;
    setTimeout(() => {
      this.execmascara()
    }, 1);
  }

  execmascara() {
    this.v_obj.transferencia.monto = this.v_fun(this.v_obj.transferencia.monto);
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
    this.exportAsService.save(this.exportAsConfig, 'Comprobante ' + this.numeroDocumentoRecibido).subscribe(() => {
    });
  }

  newCodigo($event): void {
    this.codigoVerificacion = $event;
    this.verificarCodigo();
  }

  newCodigo2($event): void {
    this.codigoVerificacion = $event;
    this.verificarCodigo();
  }

  validarDocumentos(): void {
    if (this.beneficiarioIn.tipoIdentificacion == '1') {
      this.validadorDeCedula(this.beneficiarioIn.identificacion);
    } else if (this.beneficiarioIn.tipoIdentificacion == '2') {
      //pendiente - validar RUC
    } else if (this.beneficiarioIn.tipoIdentificacion == '3') {
      //pendiente - validar Pasaporte
    }
  }

  validadorDeCedula(cedula: String) {
    let cedulaCorrecta = false;
    if (cedula.length == 10) {
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(cedula.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < cedula.length - 1; i++) {
          digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
          suma += parseInt((digito % 10) + '') + parseInt(digito / 10 + '');
        }
        suma = Math.round(suma);
        if (
          Math.round(suma % 10) == 0 &&
          Math.round(suma % 10) == verificador
        ) {
          cedulaCorrecta = true;
        } else if (10 - Math.round(suma % 10) == verificador) {
          cedulaCorrecta = true;
        } else {
          cedulaCorrecta = false;
        }
      } else {
        cedulaCorrecta = false;
      }
    } else {
      cedulaCorrecta = false;
    }
    this.cedulaEstado = cedulaCorrecta;
  }

  closeModalComprobante(): void {
    modalComprobanteIntClose();
    this.limpiarTransferencia();
  }

  realizarTransferenciaInt(): void {
    this.spinner.show();
    this.transferencia.id = this.idclienteSelec;
    this.transferencia.secuencial = this.secuencialCuenta;
    this.fecha = this.fechaActual();
    this.hora = this.horaActual();
    this._transferenciaService.createTranferenciaInt(this.transferencia).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (
          response.resultado.ProcesaTransferenciaInterbancariaResult
            .EsRespuestaCorrecta == 'true'
        ) {
          this.numeroDocumentoRecibido =
            response.resultado.ProcesaTransferenciaInterbancariaResult.NuevaTransferenciaMS.Documento;
          this.documentoComision =
            response.resultado.ProcesaTransferenciaInterbancariaResult.NuevaTransferenciaMS.DocumentoComision;
          this.conceptopTransferencia =
            response.resultado.ProcesaTransferenciaInterbancariaResult.NuevaTransferenciaMS.DetalleCuenta.ConceptoTransferencia;
          this.institucionDestino =
            response.resultado.ProcesaTransferenciaInterbancariaResult.NuevaTransferenciaMS.DetalleCuenta.InstitucionFinancieraDestino;
          this.getCuenta();
          this.closeModalTranferInt();
          modalComprobanteIntOpen();
        } else {
          Swal.fire(
            'Upss!! ha ocurrido un error en la transacción',
            response.result.ProcesaTransferenciaInternaResult
              .MensajeRespuesta,
            'error'
          );
        }
      }, (error) => {
        console.log(error)
        this.spinner.hide();
        Swal.fire(
          'Upss!! ha ocurrido un error en la transacción',
          '',
          'error'
        );
        console.log('ERROR TICT001');
      }
    );
  }

  limpiarTransferencia(): void {
    this.transferencia.monto = null;
    this.benefSelecNombre = '';
    this.idclienteSelec = '';
    this.benefSelecNumero = '';
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

  closeModalTranferInt(): void {
    this.codigoVerificacion = '';
    modalTranfIntClose();
  }

  verificarSaldo(): void {
    let saldoDisponible = this.cuentaSaldo - 5;
    if (saldoDisponible < +this.transferencia.monto) {
      this.saldoInsuficiente = true;
    } else {
      this.saldoInsuficiente = false;
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
          if (contador > 1) {
            this.variasCuentas = true;
          } else {
            this.variasCuentas = false;
          }
        }
      }, (err) => {
        this.spinner.hide();
        console.log('Error TICC001');
      }
    );
  }

  seleccionBenedficiario(numeroCliente: string, id: string, nombre: string): void {
    this.benefSelecNumero = numeroCliente;
    this.idclienteSelec = id;
    this.benefSelecNombre = nombre;
  }

  eliminarBeneficiario(id): void {
    this.spinner.show();
    this._transferenciaService.deleteBeneficiarioInt(id).subscribe(
      (response) => {
        this.transferencia.monto = null;
        this.benefSelecNombre = '';
        this.idclienteSelec = '';
        this.benefSelecNumero = '';
        this.spinner.hide();
        Swal.fire('Beneficiario eliminado correctamente!!', '', 'success');
        this.getAllbeneficiariosIn();
      },
      (error) => {
        console.log('Error TICEB001');
        this.spinner.hide();
        Swal.fire('Upss!! ha ocurrido un error.', '', 'error');
      }
    );
  }

  solicitarCodigo(): void {
    this.spinner.show();
    this._transferenciaService.solicitarCodigo().subscribe(
      (response) => {
        this.spinner.hide();
        this.codigoEnviado = true;
      }, (error) => {
        console.log('Error TICSC001');
        this.spinner.hide();
      }
    );
  }

  getAllbeneficiariosIn(): void {
    this.spinner.show();
    this._transferenciaService.getBeneficiariosIn().subscribe(
      (response: any) => {
        this.beneficiariosIn = response.beneficiarios;
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        console.log('Error TICAB001');
      }
    );
  }

  limpiarCampos(): void {
    this.codigoVerificacion = '';
    var dirtyFormID = 'formBeneficiarioI';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
  }

  agregarVeneficiario(): void {
    this.spinner.show();
    this._transferenciaService.createBenficiarioIn(this.beneficiarioIn).subscribe(
      (response) => {
        this.spinner.hide();
        this.getAllbeneficiariosIn();
        this.limpiarCampos();
        Swal.fire('Beneficiario agregado correctamente!!', '', 'success');
        modalBeneficiarioRegiIClose();
        this.codigoIncorrecto = false;
        this.codigoCorrecto = false;
      }, (error) => {
        console.log('Error TICAV001');
        this.spinner.hide();
      }
    );
  }

  verificarCodigo(): void {
    this.spinner.show();
    this.verificacion.checker = this.codigoVerificacion;
    this._transferenciaService.verificarCodigo(this.verificacion).subscribe(
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
        console.log('Error TICVC001');
        this.codigoIncorrecto = true;
      }
    );
  }

  borrar(): void {
    this.codigoVerificacion = this.codigoVerificacion.substring(
      0,
      this.codigoVerificacion.length - 1
    );
  }

  getInstituciones(): void {
    this.spinner.show();
    this._transferenciaService.getInstituciones(this.tipoI).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.instituciones = response.Instituciones;
      }, (error) => {
        this.spinner.hide();
        console.log('Error TICI001');
      }
    );
  }

  getTipoInstitucion(): void {
    this.spinner.show();
    this._transferenciaService.getTipoInstitucion().subscribe(
      (response: any) => {
        this.tipoInstitucion = response.TipoInstituciones;
        this.spinner.hide();
      }, (error) => {
        console.log('Error TICTI001');
        this.spinner.hide();
      }
    );
  }

  getConceptos(): void {
    this.spinner.show();
    this._transferenciaService.getConcepto().subscribe(
      (response: any) => {
        this.conceptos = response.TipoCuenta;
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        console.log('Error TICC001');
      }
    );
  }

  getTipoCuentas(): void {
    this.spinner.show();
    this._transferenciaService.getTipoCuenta().subscribe(
      (response: any) => {
        this.spinner.hide();
        this.tipoCuentas = response.TipoCuenta;
      }, (error) => {
        this.spinner.hide();
        console.log('Error TICTC001');
      }
    );
  }

  tipearCodigo(numero: string): void {
    if (this.codigoVerificacion.length < 6) {
      this.codigoVerificacion = this.codigoVerificacion + numero;
    }
    if (this.codigoVerificacion.length == 6) {
      this.verificacion.checker = this.codigoVerificacion;
      this.verificarCodigo();
    }
  }
}
