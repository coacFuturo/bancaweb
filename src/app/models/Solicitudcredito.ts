export class SolicitudCredito {

  public idsolicitud: number;
  public cedula: string;
  public nombres: string;
  public fechaemision: string;
  public oficina: string;
  public email: string;
  public celular: string;
  public estado: string;
  public asesor: string;
  public escliente: number;

  constructor(
    idsolicitud: number,
    cedula: string,
    nombres: string,
    fechaemision: string,
    oficina: string,
    email: string,
    celular: string,
    estado: string,
    asesor: string,
    escliente: number
  ) {
    this.idsolicitud = idsolicitud;
    this.cedula = cedula;
    this.nombres = nombres;
    this.fechaemision = fechaemision;
    this.oficina = oficina;
    this.email = email;
    this.celular = celular;
    this.estado = estado;
    this.asesor = asesor;
    this.escliente = escliente;
  }
}

