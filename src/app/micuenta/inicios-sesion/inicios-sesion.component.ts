import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IpHistorial } from 'src/app/models/iphistorial';
import { ObtenerdatosipService } from 'src/app/services/obtenerdatosip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicios-sesion',
  templateUrl: './inicios-sesion.component.html',
  styleUrls: ['./inicios-sesion.component.css']
})
export class IniciosSesionComponent implements OnInit {

  public historial: IpHistorial[] = [];
  public identificacion: string = '';

  constructor(
    private _historialService: ObtenerdatosipService,
    private _usuarioService: UserService,
    public spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.identificacion = this._usuarioService.usuario.cedula;
    this.getHistorial();
  }

  getHistorial(): void {
    this.spinner.show();
    this._historialService.getAll(this.identificacion).subscribe(
      response => {
        this.spinner.hide();
        this.historial = response.response;
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

}
