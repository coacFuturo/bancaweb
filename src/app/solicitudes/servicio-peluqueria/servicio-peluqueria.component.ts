import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/turnos/Cliente';
import { Horario } from 'src/app/models/turnos/Horario';
import { Persona } from 'src/app/models/turnos/Persona';
import { Solicitud } from 'src/app/models/turnos/Solicitud';
import { Sucursal } from 'src/app/models/turnos/Sucursal';
import { Fechac } from 'src/app/services/FechaHora';
import { HorariosService } from 'src/app/services/horarios.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-peluqueria',
  templateUrl: './servicio-peluqueria.component.html',
  styleUrls: ['./servicio-peluqueria.component.css']
})
export class ServicioPeluqueriaComponent implements OnInit {

  public sucursales: Sucursal[] = [];
  public fechaSeleccionada: string = "";
  public cantidadTurnosAlDia: number = 0;
  public diasDisponibles: any[] = [];
  public solicitudesRealizadas: Solicitud[] = [];
  public solicitudesAlmacenadas: Solicitud[] = [];
  public ultimasolicitudesAlmacenadas: Solicitud = new Solicitud(0, 0, 0, 0, 0, '', '', '', 0, '', '');
  public horariosDeServicio: Horario[] = [];
  public horariosAll: Horario[] = [];
  public turnosShow: boolean = false;
  public turnoSeleccionado: string = '';
  public turnoSeleccionadoShow: boolean = false;
  public solicitudCreate: Solicitud = new Solicitud(0, 0, 0, 0, 0, '', '', '', 0);
  public persona: Persona = new Persona(0, '', '', '', '')
  public cliente: Cliente = new Cliente(0, 0, null);
  public cantidadNumeroDiaUltimaSolicitud: number = 0;

  //datos de persona
  public cedula: string = '';
  public intervalo: any;

  constructor(
    private _usuarioService: UserService,
    private spinner: NgxSpinnerService,
    private _sucursalesService: SucursalesService,
    private _horarioService: HorariosService,
    private _solicitudService: SolicitudService
  ) {
    this.cedula = this._usuarioService.usuario.cedula;
    this.persona.IDENTIFICACION = this._usuarioService.usuario.cedula;
    this.persona.NOMBRES = this._usuarioService.usuario.nombre;
  }

  ngOnInit(): void {
    this.getSucursales();
    this.getSeisDias();
    this.getCantidadHorarios();
    this.getHorariosDiarias();
    this.VerificarSiExitePersona();
    this.getSolicitudesAlmacenadas();

  }

  cancelarSolicitud(idsolicitud: number): void {
    this._solicitudService.deleteSolicitud(idsolicitud).subscribe(
      response => {
        Swal.fire('Solicitud cancelada con exito!!', '', 'success');
        this.getSolicitudesAlmacenadas();
      }, error => {
        console.log(error);
      }
    )
  }

  getSolicitudesAlmacenadas(): void {
    this._solicitudService.getIdClientePorIdentificacion(this.cedula).subscribe(
      response => {
        this.solicitudCreate.IDCLIENTE = response.idcliente;
        if (!response.error) {
          this._solicitudService.getSolicitudPorCliente(response.idcliente, 1).subscribe(
            response => {
              this.solicitudesAlmacenadas = response.response;
              if (response.response) {
                this.getUltimaSolicitudEnviada(this.solicitudCreate.IDCLIENTE);
              } else {
                this.cantidadNumeroDiaUltimaSolicitud = 8;
              }
            }, error => {
              console.log(error);
            }
          )
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getUltimaSolicitudEnviada(idcliente: number): void {
    this._solicitudService.getUltimaSolicitudPorCliente(idcliente, 1).subscribe(
      response => {
        if (response.response) {
          this.ultimasolicitudesAlmacenadas = response.response;
          var diaDIferencia = Fechac.restarFechas(this.ultimasolicitudesAlmacenadas.FECHATURNO, Fechac.fechaActual())
          this.cantidadNumeroDiaUltimaSolicitud = diaDIferencia;
        } else {
          this.cantidadNumeroDiaUltimaSolicitud = 8;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  EnviarSolicitud(): void {
    if (this.solicitudCreate.IDSUCURSAL == 0 || this.solicitudCreate.IDSUCURSAL == null) {
      Swal.fire('Falta seleccionar la sucursal!', '', 'error');
    } else {
      if (this.fechaSeleccionada == "") {
        Swal.fire('Falta seleccionar el día del turno!', '', 'error');
      } else {
        this.solicitudCreate.FECHATURNO = this.getFechaTurno();
        this.solicitudCreate.FECHA = Fechac.fechaActual() + ' ' + Fechac.horaActual();
        this.solicitudCreate.ESTADO = "Pendiente";
        this.solicitudCreate.IDSERVICIO = 1;
        this.solicitudCreate.IDSUCURSAL = +this.solicitudCreate.IDSUCURSAL;
        this._solicitudService.getIdClientePorIdentificacion(this.cedula).subscribe(
          response => {
            this.solicitudCreate.IDCLIENTE = response.idcliente;
            this.solicitudCreate.IDPROFESIONAL = 2;
            this._solicitudService.createSolicitud(this.solicitudCreate).subscribe(
              response => {
                Swal.fire('Solicitud finalizada con exito!!', '', 'success');
                this.limpiarForm();
                this.getSolicitudesAlmacenadas();
                this.enviarNotificacionSolicitud();
              }, error => {
                console.log(error);
              }
            )
          }, error => {
            console.log(error);
          }
        )
      }
    }
  }

  enviarNotificacionSolicitud(): void {
    this._solicitudService.actualizarEmailCelular(this.cedula).subscribe(
      response => {
        this._solicitudService.getpersonaPorCedula(this.cedula).subscribe(
          response => {
            var email = response.response.EMAIL;
            var nombres = response.response.NOMBRES;
            this._solicitudService.enviarEmailSolicitud(email, Fechac.fechaActual() + Fechac.horaActual(), "Peluquería", nombres).subscribe(
              response => {
              }, error => {
                console.log(error);
              }
            )
          }, error => {
            console.log(error);
          }
        )
      }, error => {
        console.log(error);
      }
    )
  }

  limpiarForm(): void {
    this.turnosShow = false;
    this.turnoSeleccionadoShow = false;
    this.solicitudCreate = new Solicitud(0, 0, 0, 0, 0, '', '', '', 0);
    this.fechaSeleccionada = "";
  }

  getFechaTurno(): string {
    var partes = this.fechaSeleccionada.split("#");
    return partes[3] + '-' + Fechac.transformarDeMesAhNumero(partes[2]) + '-' + partes[0];
  }

  seleccionar(fecha: string, idhorario: number): void {
    clearInterval(this.intervalo)
    this.turnoSeleccionado = fecha;
    this.turnoSeleccionadoShow = true;
    this.turnosShow = false;
    this.solicitudCreate.IDHORARIO = idhorario;
  }

  VerificarSiExitePersona(): void {
    this._solicitudService.getpersonaPorCedula(this.cedula).subscribe(
      response => {
        if (response.error) {
          this.agregarPersonaCliente();
        } else {
          var idpersona = response.response.IDPERSONA;
          this._solicitudService.getClientePorId(idpersona).subscribe(
            response => {
              if (response.error) {
                this.agregarCliente(idpersona);
              }
            }, error => {
              console.log(error);
            }
          )
        }
      }, error => {
        console.log(error);
      }
    )
  }

  agregarPersonaCliente(): void {
    this._solicitudService.createPersona(this.persona).subscribe(
      response => {
        this.agregarCliente(response.idpersona);
      }, error => {
        console.log(error);
      }
    )
  }

  agregarCliente(idpersona: number): void {
    this.cliente.IDPERSONA = idpersona;
    this.cliente.ULTIMAFECHASOLICUTDUD = new Date();
    this._solicitudService.createCliente(this.cliente).subscribe(
      response => {
      }, error => {
        console.log(error);
      }
    )
  }

  mostrarTurnos(): void {
    this.turnoSeleccionadoShow = false;
    clearInterval(this.intervalo)
    this.turnosShow = true;
    this.verificarSolicitudesRealizadas()
    this.intervalo = setInterval(() => {
      this.verificarSolicitudesRealizadas()
    }, 3000);
  }

  verificarSolicitudesRealizadas(): void {
    var fecha = this.getFechaTurno();
    this._solicitudService.getSolicitudPorFechaTurno(fecha, 1).subscribe(
      response => {
        this.solicitudesRealizadas = response.response;
        if (response.error) {
          this.horariosDeServicio = this.horariosAll
        } else {
          this.horariosDeServicio = [];
          var estado = true;
          for (let k = 0; k < this.horariosAll.length; k++) {
            for (let i = 0; i < this.solicitudesRealizadas.length; i++) {
              if (this.solicitudesRealizadas[i].IDHORARIO == this.horariosAll[k].IDHORARIO) {
                estado = false;
              }
            }
            if (estado == true) {
              this.horariosDeServicio.push(this.horariosAll[k]);
            }
            estado = true;
          }
        }
      }, error => {
        console.log(error)
      }
    )
  }

  getHorariosDiarias(): void {
    this._horarioService.getall(1).subscribe(
      response => {
        this.horariosAll = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getCantidadHorarios(): void {
    this._horarioService.getCount(1).subscribe(
      response => {
        this.cantidadTurnosAlDia = response.response.COUNT;
      }, error => {
        console.log(error);
      }
    )
  }

  getSeisDias(): void {
    var diaExport = 0; // 11
    var dias = [];
    var nombreDelDia = Fechac.generarNombreDia(Fechac.numeroDia());
    var contador = 0;
    var mes = "";
    var anio = "";
    for (let i = 0; i < 6; i++) {
      if (nombreDelDia == 'sábado' || nombreDelDia == 'domingo') {
        if (nombreDelDia == 'sábado') {
          contador = contador + 2;
          diaExport = +Fechac.obtenerDiaDelMesMaIncremento(contador)[0];
          nombreDelDia = Fechac.obtenerDiaDelMesMaIncremento(contador)[1];
          mes = Fechac.obtenerDiaDelMesMaIncremento(contador)[2];
          anio = Fechac.obtenerDiaDelMesMaIncremento(contador)[3];
        } else {
          contador = contador + 1;
          diaExport = +Fechac.obtenerDiaDelMesMaIncremento(contador)[0];
          nombreDelDia = Fechac.obtenerDiaDelMesMaIncremento(contador)[1];
          mes = Fechac.obtenerDiaDelMesMaIncremento(contador)[2];
          anio = Fechac.obtenerDiaDelMesMaIncremento(contador)[3];
        }
      } else {
        if (dias.length == 0) {
          if (nombreDelDia == 'viernes') {
            contador = contador + 3;
          } else {
            contador = contador + 1;
          }
          if (Fechac.verificarHora() == false) {
            diaExport = +Fechac.obtenerDiaDelMesMaIncremento(contador)[0];
            nombreDelDia = Fechac.obtenerDiaDelMesMaIncremento(contador)[1];
            mes = Fechac.obtenerDiaDelMesMaIncremento(contador)[2];
            anio = Fechac.obtenerDiaDelMesMaIncremento(contador)[3];
          } else {
            diaExport = +Fechac.obtenerDiaDelMesMaIncremento(contador)[0];
            nombreDelDia = Fechac.obtenerDiaDelMesMaIncremento(contador)[1];
            mes = Fechac.obtenerDiaDelMesMaIncremento(contador)[2];
            anio = Fechac.obtenerDiaDelMesMaIncremento(contador)[3];
          }
        } else {
          if (dias.length > 0) {
            if (nombreDelDia == 'viernes') {
              contador = contador + 3;
            } else {
              contador = contador + 1;
            }
          }
          diaExport = +Fechac.obtenerDiaDelMesMaIncremento(contador)[0];
          nombreDelDia = Fechac.obtenerDiaDelMesMaIncremento(contador)[1];
          mes = Fechac.obtenerDiaDelMesMaIncremento(contador)[2];
          anio = Fechac.obtenerDiaDelMesMaIncremento(contador)[3];
          if (dias.length == 0) {
            contador = contador + 1;
          }
        }
      }
      dias.push({
        dia: diaExport,
        nombre: nombreDelDia,
        mes: mes,
        anio: anio
      });
    }
    this.diasDisponibles = dias;
  }

  getSucursales(): void {
    this._sucursalesService.getAllPeluqueria().subscribe(
      response => {
        this.sucursales = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

}
