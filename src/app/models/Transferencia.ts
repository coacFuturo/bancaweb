export class Transferencia {

    public id: string;
    public monto: number;
    public secuencial: string;

    constructor(
        id: string,
        monto: number,
        secuencial: string
    ){
        this.id = id;
        this.monto = monto;
        this.secuencial = secuencial;
    }
}
