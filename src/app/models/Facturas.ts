export class Facturas {

  public SECUENCIAL: string;
  public CLAVEACCESO: string;
  public FECHAEMISION: string;
  public DIRESTABLECIMIENTO: string;
  public RAZONSOCIAL: string;
  public IMPORTETOTAL: string;

  constructor(
    SECUENCIAL: string,
    CLAVEACCESO: string,
    FECHAEMISION: string,
    DIRESTABLECIMIENTO: string,
    RAZONSOCIAL: string,
    IMPORTETOTAL: string
  ){
    this.SECUENCIAL = SECUENCIAL;
    this.CLAVEACCESO = CLAVEACCESO;
    this.FECHAEMISION = FECHAEMISION;
    this.DIRESTABLECIMIENTO = DIRESTABLECIMIENTO;
    this.RAZONSOCIAL = RAZONSOCIAL;
    this.IMPORTETOTAL = IMPORTETOTAL;
  }
}
