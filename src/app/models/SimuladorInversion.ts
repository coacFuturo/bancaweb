export class SimuladorInversion {

    public codigoTipoDeposito : string;
    public plazoEnDias: string;
    public monto: string;
    public numeroDiasPeriodico: number

    constructor(
        codigoTipoDeposito : string,
        plazoEnDias: string,
        monto: string,
        numeroDiasPeriodico: number
    ) {
        this.codigoTipoDeposito  = codigoTipoDeposito ;
        this.plazoEnDias = plazoEnDias;
        this.monto = monto;
        this.numeroDiasPeriodico = numeroDiasPeriodico;
    }
}