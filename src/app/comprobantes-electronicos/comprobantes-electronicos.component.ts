import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Facturas } from '../models/Facturas';
import { FacturaService } from '../services/facturas.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comprobantes-electronicos',
  templateUrl: './comprobantes-electronicos.component.html',
  styleUrls: ['./comprobantes-electronicos.component.css']
})
export class ComprobantesElectronicosComponent implements OnInit {

  public cedula: string = '';
  public facturas: Facturas[];

  constructor(
    private userServices: UserService,
    private _facturaService: FacturaService,
    private spinner: NgxSpinnerService
  ) {
    this.cedula = userServices.usuario.cedula;
  }

  ngOnInit(): void {
    this.getFacturas();
  }

  irHaFacturas(CLAVEACCESO: string): void {
    window.open('https://sistemflm.futurolamanense.fin.ec/comprobantes/' + CLAVEACCESO + '.pdf', '_blank')
  }

  getFacturas(): void {
    this.spinner.show();
    this._facturaService.getFacturas(this.cedula).subscribe(
      response => {
        this.spinner.hide();
        this.facturas = response.response;
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

}
