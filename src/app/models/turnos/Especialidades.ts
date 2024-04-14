export class Especialidades {

  public idespecialidad: number;
  public especialidad: string;
  public estado: number;
  public idclinica: number;

  constructor(
    idespecialidad: number,
    especialidad: string,
    estado: number,
    idclinica: number
  ) {
    this.idespecialidad = idespecialidad;
    this.especialidad = especialidad;
    this.estado = estado;
    this.idclinica = idclinica;
  }
}
