import { Component, OnInit } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { NgxSpinnerService } from 'ngx-spinner';
import { SimuladorInversion } from 'src/app/models/SimuladorInversion';
import { SimuladorService } from 'src/app/services/simulador.service';

@Component({
  selector: 'app-simulador-inversiones',
  templateUrl: './simulador-inversiones.component.html',
  styleUrls: ['./simulador-inversiones.component.css'],
})
export class SimuladorInversionesComponent implements OnInit {
  public simuladInversionCreate: SimuladorInversion = new SimuladorInversion('', '', '', null);
  public tipoDepositoss: any[];
  public inversionData: any;

  public Interes: string = '';
  public Monto: string = '';
  public PlazoEnDias: string = '';
  public Retencion: string = '';
  public Tasa: string = '';
  public TotalRecibir: string = '';
  public cuotas: any[];

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'simuladorInversionesCalculo',
  }

  constructor(
    private _simuladorService: SimuladorService,
    private spinner: NgxSpinnerService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
    this.getTipoDeposito();
  }

  descargarResultadosSimulador(): void {
    this.exportAsService.save(this.exportAsConfig, 'Calculo de inversiones').subscribe(() => {
    });
  }

  getTipoDeposito(): void {
    this.spinner.show();
    this._simuladorService.tipoDeposito().subscribe(
      (response: any) => {
        this.spinner.hide();
        this.tipoDepositoss = response.tipodepositos;
      },
      (error) => {
        console.log('Error SICTD001');
        this.spinner.hide();
      }
    );
  }

  consultarInveriones(): void {
    this.spinner.show();
    this._simuladorService.consultarSimuInversion(this.simuladInversionCreate).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (response.result.SimuladorPlazoFijoResult.EsRespuestaCorrecta == 'true') {
          this.inversionData = response.result.SimuladorPlazoFijoResult.DatosSimuladorMS;
          this.Interes = this.inversionData.Interes;
          this.Monto = this.inversionData.Monto;
          this.PlazoEnDias = this.inversionData.PlazoEnDias;
          this.Retencion = this.inversionData.Retencion;
          this.Tasa = this.inversionData.Tasa;
          this.TotalRecibir = this.inversionData.TotalRecibir;
          this.cuotas = this.inversionData.Cuotas.Cuotas.DevelveCuotasTipoDepositoMS;
        }
      },
      (error) => {
        this.spinner.hide();
        console.log('Error SICCI001');
      }
    );
  }

  limpiarCampos(): void {
    var dirtyFormID = 'formSimInversion';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
    this.inversionData = null;
  }
}
