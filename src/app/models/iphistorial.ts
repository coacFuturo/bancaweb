export class IpHistorial {

  public idhistorial: number;
  public fecha_hora: string;
  public ipns: string;
  public dispositivo: string;
  public ubicacion: string;
  public identificacion: string;

  constructor(
    idhistorial: number,
    fecha_hora: string,
    ipns: string,
    dispositivo: string,
    ubicacion: string,
    identificacion: string
  ) {
    this.idhistorial = idhistorial;
    this.fecha_hora = fecha_hora;
    this.ipns = ipns;
    this.dispositivo = dispositivo;
    this.ubicacion = ubicacion;
    this.identificacion = identificacion;
  }
}
