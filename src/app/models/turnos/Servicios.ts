export class Servicios {

  public IDSERVICIO: number;
  public SERVICIO: string;
  public TIPOSERVICIO: string;
  public URL: string;
  public ICON: string;
  public ESTADO: boolean;

  constructor(
    IDSERVICIO: number,
    SERVICIO: string,
    TIPOSERVICIO: string,
    URL: string,
    ICON: string,
    ESTADO: boolean,
  ){
    this.IDSERVICIO = IDSERVICIO;
    this.SERVICIO = SERVICIO;
    this.TIPOSERVICIO = TIPOSERVICIO;
    this.URL = URL;
    this.ICON = ICON;
    this.ESTADO = ESTADO;
  }
}
