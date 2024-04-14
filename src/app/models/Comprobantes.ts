export class Comprobante {

    public _id: string;
    public nombre: string;
    public monto: number;
    public fecha: string;
    public beneficiario: string;
    public cliente: string;
    public __v: number;

    constructor(
        _id: string,
        nombre: string,
        monto: number,
        fecha: string,
        beneficiario: string,
        cliente: string,
        __v: number
    ){
        this._id = _id;
        this.nombre = nombre;
        this.monto = monto;
        this.fecha = fecha;
        this.beneficiario = beneficiario;
        this.cliente = cliente;
        this.__v = __v;
    }
}