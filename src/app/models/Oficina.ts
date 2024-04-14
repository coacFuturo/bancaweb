export class Oficina {

  public ciudad: string;
  public codigoOficinaControl: string;
  public secuencialDivision: number;

  constructor(
    ciudad: string,
    codigoOficinaControl: string,
    secuencialDivision: number
  ) {
    this.ciudad = ciudad;
    this.codigoOficinaControl = codigoOficinaControl;
    this.secuencialDivision = secuencialDivision;
  }
}
