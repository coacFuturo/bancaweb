export class Tipousuario {

  public idtipousuario: number;
  public codigousuario: string;
  public oficina: string;
  public tipouser: string;

  constructor(
    idtipousuario: number,
    codigousuario: string,
    oficina: string,
    tipouser: string
  ) {
    this.idtipousuario = idtipousuario;
    this.codigousuario = codigousuario;
    this.oficina = oficina;
    this.tipouser = tipouser;
  }
}
