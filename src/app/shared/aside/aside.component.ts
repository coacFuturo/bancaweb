import { Component } from '@angular/core';
import { Servicios } from 'src/app/models/turnos/Servicios';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styles: [],
})
export class AsideComponent {

  public showTurnos: boolean = false;

  public nombre: string;
  public nick: string;
  public img: string;
  public oficina: string;

  public servicios: Servicios[] = [];

  public peluqueriaEstado: boolean = false;
  public odontologiaEstado: boolean = false;
  public medicinaEstado: boolean = false;

  constructor(
    private userServices: UserService,
    private _estadoService: SolicitudService
  ) {
    this.nombre = userServices.usuario.getNombre;
    this.nick = userServices.usuario.getNick;
    this.img = userServices.usuario.getImg;
    this.oficina = userServices.usuario.getOficina;
    this.getEstado();
  }

  logout() {
    this.userServices.logout();
  }

  getEstado(): void {
    this._estadoService.getServicios().subscribe(
      response => {
        this.servicios = response.response;
        if (response.response) {
          for (let i = 0; i < this.servicios.length; i++) {
            if (this.servicios[i].IDSERVICIO == 1 && this.servicios[i].ESTADO == true) {
              this.peluqueriaEstado = true;
            } else if (this.servicios[i].IDSERVICIO == 2 && this.servicios[i].ESTADO == true) {
              this.odontologiaEstado = true;
            } else if (this.servicios[i].IDSERVICIO == 3 && this.servicios[i].ESTADO == true) {
              this.medicinaEstado = true;
            }
          }
        }
      }, error => {
        console.log(error);
      }
    )
  }
}
