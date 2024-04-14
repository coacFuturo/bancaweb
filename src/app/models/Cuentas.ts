export class Cuenta {

    public secuencial: number;
    public saldo: number;
    public codigo: string;
    public fechaapertura: string;
    public estado: string;
    public nombreproducto: string;
    public tipo: string;
    public oficina: string;

    constructor(
        secuencial: number,
        saldo: number,
        codigo: string,
        fechaapertura: string,
        estado: string,
        nombreproducto: string,
        tipo: string,
        oficina: string
    ) {
        this.secuencial = secuencial;
        this.saldo = saldo;
        this.codigo = codigo;
        this.fechaapertura = fechaapertura;
        this.estado = estado; 
        this.nombreproducto = nombreproducto;
        this.tipo = tipo;
        this.oficina = oficina;
    }
}

export class TipoCuentas {

    public codigo: string;
    public nombre: string;
    public secuencial: number;

    constructor(
        codigo: string,
        nombre: string,
        secuencial: number
    ) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.secuencial = secuencial;
    }
}
