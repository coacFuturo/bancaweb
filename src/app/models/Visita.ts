export class Visita {

  public fechavisita: string;
  public horavisita: string;
  public dispositivo: string;

  constructor(
    fechavisita: string,
    horavisita: string,
    dispositivo: string
  ){
    this.fechavisita = fechavisita;
    this.horavisita = horavisita;
    this.dispositivo = dispositivo;
  }
}
