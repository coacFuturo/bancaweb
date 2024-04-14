import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidades } from 'src/app/models/turnos/Especialidades';
import { EspecialidadClinica, SolicitudEspecialidadMedica, SolicitudEspecialidadRelacion } from 'src/app/models/turnos/SolicitudEspecialidadMedica';
import { Cliente } from 'src/app/models/turnos/Cliente';
import { Horario } from 'src/app/models/turnos/Horario';
import { Persona } from 'src/app/models/turnos/Persona';
import { Solicitud } from 'src/app/models/turnos/Solicitud';
import { Sucursal } from 'src/app/models/turnos/Sucursal';
import { Fechac } from 'src/app/services/FechaHora';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HorariosService } from 'src/app/services/horarios.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SolicitudEspecialidadesMedicasService } from 'src/app/services/solicitudespecialidadesmedicas.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { modalInfoTurnoOpen, modalInfoTurnoClose } from 'src/assets/modal.js';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-medicina-general',
  templateUrl: './medicina-general.component.html',
  styleUrls: ['./medicina-general.component.css']
})
export class MedicinaGeneralComponent implements OnInit {

  public solicitudCreate: Solicitud = new Solicitud(0, 0, 0, 0, 0, '', '', '', 0);
  public sucursales: Sucursal[] = [];
  public fechaSeleccionada: string = "";
  public diasDisponibles: any[] = [];
  public turnosShow: boolean = false;
  public turnoSeleccionado: string = '';
  public turnoSeleccionadoShow: boolean = false;
  public solicitudesAlmacenadas: Solicitud[] = [];
  public solicitudesRealizadas: Solicitud[] = [];
  public horariosDeServicio: Horario[] = [];
  public horariosAll: Horario[] = [];
  public cantidadTurnosAlDia: number = 0;
  public persona: Persona = new Persona(0, '', '', '', '')
  public cliente: Cliente = new Cliente(0, 0, null);
  public ultimasolicitudesAlmacenadas: Solicitud = new Solicitud(0, 0, 0, 0, 0, '', '', '', 0, '', '');

  //datos de persona
  public identificacion: string = '';
  public intervalo: any;

  public esBenificiario: boolean = true;
  public especialidades: Especialidades[] = [];

  public idespecialidad: number = 0;

  public solicitudEspecialidad: SolicitudEspecialidadMedica = new SolicitudEspecialidadMedica(0, 0, 0);

  public solicitudEspecialidadRelacion: SolicitudEspecialidadRelacion = new SolicitudEspecialidadRelacion(0, 0, 0, 0, 0, '', '', '', 0, '', '', 0);
  public idclinica: number = 0;

  public especialidadClinica: EspecialidadClinica = new EspecialidadClinica(0, '', '', '');
  public solicitudOne: Solicitud = new Solicitud(0, 0, 0, 0, 0, '', '', '', 0, '', '');

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'printTurnoMedico',
  }

  constructor(
    private _usuarioService: UserService,
    private spinner: NgxSpinnerService,
    private _solicitudService: SolicitudService,
    private _sucursalesService: SucursalesService,
    private _horarioService: HorariosService,
    private _especialidadesService: EspecialidadesService,
    private _solicitudEspecialidadService: SolicitudEspecialidadesMedicasService,
    private exportAsService: ExportAsService
  ) {
    this.identificacion = this._usuarioService.usuario.cedula;
    this.persona.IDENTIFICACION = this._usuarioService.usuario.cedula;
    this.persona.NOMBRES = this._usuarioService.usuario.nombre;
  }

  ngOnInit(): void {
    this.verificarCliente();
  }

  closeModalDetalleTurno(): void {
    modalInfoTurnoClose();
  }

  descargarTurno(idsolicitud): void {
    this.exportAsService.save(this.exportAsConfig, 'Turno atención médica ' + idsolicitud).subscribe(() => {
    });
  }

  openModalDetalleTurno(idsolicitud: number): void {
    this.getDetalleTurno(idsolicitud);
    modalInfoTurnoOpen();
  }

  getDetalleTurno(idsolicitud: number): void {
    this._solicitudService.getSolicitudOne(idsolicitud).subscribe(
      response => {
        this.solicitudOne = response.response;
        this.getEspecialidadClinica(idsolicitud);
      }, error => {
        console.log(error);
      }
    )
  }

  getEspecialidadClinica(idsolicitud: number): void {
    this._solicitudEspecialidadService.getOneSolicitudespecialidadMedica(idsolicitud).subscribe(
      response => {
        this.especialidadClinica = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getEspecialidades(): void {
    this._especialidadesService.getAllEspecialidades(this.idclinica).subscribe(
      response => {
        this.especialidades = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  verificarCliente(): void {
    this._solicitudService.verificarSiTieneCuentaActiva(this.identificacion).subscribe(
      response => {
        if (response.response != "noexiste") {
          this.esBenificiario = false;
        }
        if (response.response == "ok") {
          this.esBenificiario = true;
          this.getSucursales();
          this.getSeisDias();
          this.getCantidadHorarios();
          this.getHorariosDiarias();
          this.VerificarSiExitePersona();
          this.getSolicitudesAlmacenadas();
        }
      }, error => {
        console.log(error);
      }
    )
  }

  seleccionar(fecha: string, idhorario: number): void {
    clearInterval(this.intervalo)
    this.turnoSeleccionado = fecha;
    this.turnoSeleccionadoShow = true;
    this.turnosShow = false;
    this.solicitudCreate.IDHORARIO = idhorario;
  }

  guardarRelacionSolicitudEspecialidad(idsolicitud: number): void {
    this.solicitudEspecialidad.idsolicitud = +idsolicitud;
    this.solicitudEspecialidad.idespecialidad = +this.idespecialidad;
    this._solicitudEspecialidadService.createSolicitudespecialidadesMedicas(this.solicitudEspecialidad).subscribe(
      response => {

      }, error => {
        console.log(error);
      }
    )
  }

  EnviarSolicitud(): void {
    if (this.fechaSeleccionada == "") {
      Swal.fire('Seleccionar día !', '', 'error');
    } else {
      this.solicitudCreate.FECHATURNO = this.getFechaTurno();
      this.solicitudCreate.FECHA = Fechac.fechaActual() + ' ' + Fechac.horaActual();
      this.solicitudCreate.ESTADO = "Pendiente";
      this.solicitudCreate.IDSERVICIO = 3;
      this.solicitudCreate.IDSUCURSAL = 1;
      this._solicitudService.getIdClientePorIdentificacion(this.identificacion).subscribe(
        response => {
          this.solicitudCreate.IDCLIENTE = response.idcliente;
          this.solicitudCreate.IDPROFESIONAL = 3;
          this._solicitudService.createSolicitud(this.solicitudCreate).subscribe(
            response => {
              this.guardarRelacionSolicitudEspecialidad(response.response);
              this.enviarNotificacionSolicitud();
              Swal.fire('Solicitud finalizada con exito!!', '', 'success');
              this.limpiarForm();
              this.getSolicitudesAlmacenadas();
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

  enviarNotificacionSolicitud(): void {
    this._solicitudService.actualizarEmailCelular(this.identificacion).subscribe(
      response => {
        this._solicitudService.getpersonaPorCedula(this.identificacion).subscribe(
          response => {
            var email = response.response.EMAIL;
            var nombres = response.response.NOMBRES;
            this._solicitudService.enviarEmailSolicitud(email, Fechac.fechaActual() + Fechac.horaActual(), "Medicina general", nombres).subscribe(
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
    this.idclinica = 0;
    this.especialidades = [];
    this.idespecialidad = 0;
  }

  VerificarSiExitePersona(): void {
    this._solicitudService.getpersonaPorCedula(this.identificacion).subscribe(
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

  getSolicitudesAlmacenadas(): void {
    this._solicitudService.getIdClientePorIdentificacion(this.identificacion).subscribe(
      response => {
        this.solicitudCreate.IDCLIENTE = response.idcliente;
        if (!response.error) {
          this._solicitudEspecialidadService.getAllSolicitudRelacionpecialidadesMedicas(3, this.identificacion).subscribe(
            response => {
              this.solicitudesAlmacenadas = response.response;
              /*
              if (response.response) {
                this.getUltimaSolicitudEnviada(this.solicitudCreate.IDCLIENTE);
              }
              */
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
    this._solicitudService.getUltimaSolicitudPorCliente(idcliente, 3).subscribe(
      response => {
        if (response.response) {
          this.ultimasolicitudesAlmacenadas = response.response;
          var diaDIferencia = Fechac.restarFechas(this.ultimasolicitudesAlmacenadas.FECHATURNO, Fechac.fechaActual())
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getHorariosDiarias(): void {
    this.spinner.show();
    this._horarioService.getall(3).subscribe(
      response => {
        this.spinner.hide();
        this.horariosAll = response.response;
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  getCantidadHorarios(): void {
    this.spinner.show();
    this._horarioService.getCount(3).subscribe(
      response => {
        this.spinner.hide();
        this.cantidadTurnosAlDia = response.response.COUNT;
      }, error => {
        this.spinner.hide();
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
          if (Fechac.verificarHora() == false) {
            contador = contador + 1;
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
    this.spinner.show();
    this._sucursalesService.getAllPeluqueria().subscribe(
      response => {
        this.spinner.hide();
        this.sucursales = response.response;
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  mostrarTurnos(): void {
    this.turnoSeleccionadoShow = false;
    clearInterval(this.intervalo)
    if (this.idespecialidad != 0) {
      this.turnosShow = true;
    }

    this.verificarSolicitudesRealizadas()
    this.intervalo = setInterval(() => {
      this.verificarSolicitudesRealizadas()
    }, 3000);
  }

  verificarSolicitudesRealizadas(): void {
    var fecha = this.getFechaTurno();
    this._solicitudService.getSolicitudPorFechaTurno(fecha, 3).subscribe(
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

  getFechaTurno(): string {
    var partes = this.fechaSeleccionada.split("#");
    return partes[3] + '-' + Fechac.transformarDeMesAhNumero(partes[2]) + '-' + partes[0];
  }
}
