import { Component, OnInit } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { NgxSpinnerService } from 'ngx-spinner';
import { SimuladorAhorroPro } from 'src/app/models/SimuladorAhorro';
import { SimuladorService } from 'src/app/services/simulador.service';

@Component({
  selector: 'app-simulador-ahorroprogramado',
  templateUrl: './simulador-ahorroprogramado.component.html',
  styleUrls: ['./simulador-ahorroprogramado.component.css'],
})
export class SimuladorAhorroprogramadoComponent implements OnInit {
  public simulaAhorroCreate: SimuladorAhorroPro = new SimuladorAhorroPro(null, null, null, null);
  public ahorroData: any;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'printresultsumuladorahorropro',
  }

  constructor(
    private _simuladorService: SimuladorService,
    private spinnner: NgxSpinnerService,
    private exportAsService: ExportAsService
  ) {}

  ngOnInit(): void {}

  descargarResultadosSimulador(): void {
    this.exportAsService.save(this.exportAsConfig, 'Calculo de ahorro programado').subscribe(() => {
    });
  }

  limpiarCampos(): void {
    var dirtyFormID = 'formSimAhorro';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
    this.ahorroData = null;
  }

  simuladorAhorro(): void {
    this.spinnner.show();
    this._simuladorService
      .consultarSimuAhorro(this.simulaAhorroCreate)
      .subscribe(
        (response: any) => {
          this.spinnner.hide();
          if (
            response.result.SimuladorAhorroInversionResult
              .EsRespuestaCorrecta == 'true'
          ) {
            this.ahorroData =
              response.result.SimuladorAhorroInversionResult.DatosSimuladorMS.ListaCuotas.CuotaAhorroInversion;
          }
        },
        (error) => {
          this.spinnner.hide();
          console.log('Error SACS001');
        }
      );
  }
}
