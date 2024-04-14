import { Component, OnInit } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { NgxSpinnerService } from 'ngx-spinner';
import { SimuladorCredito } from 'src/app/models/SimuladorCredito';
import { SimuladorService } from 'src/app/services/simulador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-simulador-credito',
  templateUrl: './simulador-credito.component.html',
  styleUrls: ['./simulador-credito.component.css'],
})
export class SimuladorCreditoComponent implements OnInit {
  public simuladorCrediCreate: SimuladorCredito = new SimuladorCredito('', '', '', '', '', '', null, null, '');
  public tipoPrestamo: any[];
  public tipoTabla: any[];
  public segmentoInterno: any[];
  public subCalificacion: any[];
  public creditoData: any;
  public cuotas: any[];

  public DescripcionTipoPrestamo: string = '';
  public NumeroCuotas: string = '';
  public FrecuenciaPago: string = '';
  public MontoSolicitado: string = '';
  public ValorTasa: string = '';
  public FechaAdjudicacion: string = '';
  public FechaVencimiento: string = '';
  public DeudaInicial: string = '';
  public ValorAEntregar: string = '';

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'printresultsumuladorcredito',
  }

  constructor(
    private _simuladorService: SimuladorService,
    private spinner: NgxSpinnerService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
    this.getAllTipoPrestamo();
  }

  descargarResultadosSimulador(): void {
    this.exportAsService.save(this.exportAsConfig, 'Calculo de crédito').subscribe(() => {
    });
  }

  getAllTipoPrestamo(): void {
    this.spinner.show();
    this._simuladorService.getTipoPrestamo().subscribe(
      (response: any) => {
        this.spinner.hide();
        this.tipoPrestamo = response.tipoprestamos;
      },
      (error) => {
        this.spinner.hide();
        console.log('Error SCCTP001');
      }
    );
  }

  getTipoTabla(): void {
    this.spinner.show();
    this._simuladorService
      .getTipoTabla(this.simuladorCrediCreate.tipoPrestamo)
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          this.tipoTabla = response.tipotablas;
        },
        (error) => {
          console.log('Error SCCTT001');
          this.spinner.hide();
        }
      );
    this.getSegmentoInterno();
  }

  getSegmentoInterno(): void {
    this.spinner.show();
    this._simuladorService
      .getSementoInterno(this.simuladorCrediCreate.tipoPrestamo)
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          this.segmentoInterno = response.segmentointernos;
        },
        (error) => {
          this.spinner.hide();
          console.log('Error SCCSI001');
        }
      );
  }

  getSubcalificacion(): void {
    this.spinner.show();
    this._simuladorService
      .getSubcalificacion(this.simuladorCrediCreate.segmentoInterno)
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          this.subCalificacion = response.subcalificacion;
        },
        (error) => {
          this.spinner.hide();
          console.log('Error SCCS001');
        }
      );
  }

  consultarCredito(): void {
    this._simuladorService
      .consultarCredito(this.simuladorCrediCreate)
      .subscribe(
        (response: any) => {
          if (
            response.result.DevuelveTablaPresuntivaParaSitioResult
              .EsRespuestaCorrecta == 'true'
          ) {
            this.creditoData = response.result.DevuelveTablaPresuntivaParaSitioResult.DevuelveTablaPresuntivaParaImpresionMS;
            this.DescripcionTipoPrestamo =
              this.creditoData.DescripcionTipoPrestamo;
            this.NumeroCuotas = this.creditoData.NumeroCuotas;
            this.FrecuenciaPago = this.creditoData.FrecuenciaPago;
            this.MontoSolicitado = this.creditoData.MontoSolicitado;
            this.ValorTasa = this.creditoData.ValorTasa;
            this.FechaAdjudicacion = this.creditoData.FechaAdjudicacion;
            this.FechaVencimiento = this.creditoData.FechaVencimiento;
            this.DeudaInicial = this.creditoData.DeudaInicial;
            this.ValorAEntregar = this.creditoData.ValorAEntregar;
            this.cuotas = this.creditoData.ItemsTabla.TablaPagos_PorCuotas;
          } else {
            Swal.fire('Error', 'Error de respuesta', 'error');
          }
        },
        (error) => {
          console.log('Error SCCC001');
        }
      );
  }

  mascaraFechas(fecha: Date): any {
    var event = new Date(fecha);
    let date = JSON.stringify(event)
    date = date.slice(1, 11)
    return date;
  }

  limpiarCampos(): void {
    var dirtyFormID = 'formSimCredito';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
    this.creditoData = null;
    this.tipoTabla = [];
    this.segmentoInterno = [];
    this.subCalificacion = [];
  }
}
