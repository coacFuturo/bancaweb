export class TransferenciaInt {

    public id: string;
    public monto: number;
    public detalle: string;
    public secuencial: string;

    constructor(
        id: string,
        monto: number,
        detalle: string,
        secuencial: string
    ){
        this.id = id;
        this.monto = monto;
        this.detalle = detalle;
        this.secuencial = secuencial;
    }
}
