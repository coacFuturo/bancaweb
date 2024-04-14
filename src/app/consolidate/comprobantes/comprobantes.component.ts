import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { One } from 'src/app/models/Beneficiario';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { TransferenciaService } from '../../services/tranferencias.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.component.html',
  styleUrls: ['./comprobantes.component.css'],
})
export class ComprobantesComponent implements OnInit {
  public comprobantes: any[];
  public nombrePropietario: string = '';
  public Monto: string = '';
  public numeroDocumentoRecibido: string = '';
  public fechaComprobante: any = '';
  public tipoTransaccion: string = '';
  public cuentaNumero: string = '';
  public Cuentas: any[];
  public oneBeneficiario: One = new One('', '');
  public nombreBeneficiario: string = '';
  public cuentaCliente: string = '';
  public concepto: string = '';
  public institucionDestino: string = '';

  exportAsConfig: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'printcomprobantesid',
  }

  constructor(
    private _transferenciaService: TransferenciaService,
    private userServices: UserService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private exportAsService: ExportAsService
  ) {
    this.nombrePropietario = userServices.usuario.getNombre;
  }

  ngOnInit(): void {
    this.getComprobantes();
    this.getCuenta();
  }

  descargarComprobante(): void {
    this.exportAsService.save(this.exportAsConfig, 'Comprobante ' + this.numeroDocumentoRecibido).subscribe(() => {
    });
  }

  getOneBeneficiario(id: string, interna: string): void {
    this.oneBeneficiario.id = id;
    this.oneBeneficiario.interna = interna;
    this.spinner.show();
    this._transferenciaService.getOneBeneficiario(this.oneBeneficiario).subscribe(
      (response: any) => {
        console.log(response)
        this.nombreBeneficiario = response.result.nombre;
        if (response.result.numerocliente) {
          this.cuentaCliente = response.result.numerocliente;
        } else if (response.result.numeroCuentaBeneficiario) {
          this.cuentaCliente = response.result.numeroCuentaBeneficiario;
        }
        this.spinner.hide();
      }, (error) => {
        console.log('Error COMCB001');
        this.spinner.hide();
      }
    );
  }

  dataComprobanteOne(idbeneficiario, codigo, fecha, monto, tipoTransaccion, interna, detalle): void {
    this.numeroDocumentoRecibido = codigo;
    this.fechaComprobante = fecha;
    this.Monto = monto;
    this.tipoTransaccion = tipoTransaccion;
    this.getOneBeneficiario(idbeneficiario, interna);
    if (detalle == undefined) {
      this.concepto = '';
      this.institucionDestino = '';
    } else {
      this.splitDetalle(detalle);
    }
  }

  splitDetalle(datallew: string): void {
    var d = datallew.split('{');
    var d2 = d[1].split(',');
    var objetoConcepto = d2[0];
    var objetoInstitucion = d2[8];
    var arrayConcepto = objetoConcepto.split('"');
    var arrayInstitucion = objetoInstitucion.split('"');
    this.concepto = arrayConcepto[3];
    this.institucionDestino = arrayInstitucion[3];
  }

  getCuenta(): void {
    this.authService.callConsolidated().subscribe(
      (resp: any) => {
        if (resp.cuentas) {
          this.Cuentas = resp.cuentas;
          this.Cuentas.forEach((cue) => {
            if (cue.NombreTipoCuenta == 'Ahorros') {
              this.cuentaNumero = cue.Codigo;
            }
          });
        }
      },
      (err) => {
        console.log('Error COMCC001');
      }
    );
  }

  getComprobantes(): void {
    this.spinner.show();
    this._transferenciaService.getComprobantes().subscribe(
      (response: any) => {
        this.spinner.hide();
        this.comprobantes = response.result.reverse();
      },
      (error) => {
        this.spinner.hide();
        console.log('Error COMCC002');
      }
    );
  }

  mascaraFechas(fecha: Date): any {
    var event = new Date(fecha);
    let date = JSON.stringify(event)
    date = date.slice(1, 11)
    return date;
  }
}
