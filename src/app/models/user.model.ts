export class User {
  constructor(
    public _id?: string,
    public nombre?: string,
    public email?: string,
    public nick?: string,
    public img?: string,
    public oficina?: string,
    public role?: string,
    public cedula?: string,
  ) {}
  get getNombre(): string {
    return this.nombre;
  }
  get getEmail(): string {
    return this.email;
  }
  get getNick(): string {
    return this.nick;
  }
  get getImg(): string {
    return this.img;
  }
  get getOficina(): string {
    return this.oficina;
  }
  get getRole(): string {
    return this.role;
  }
  get getCedula(): string {
    return this.cedula;
  }
}
