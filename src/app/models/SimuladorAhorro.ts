export class SimuladorAhorroPro {

    public montoApertura: number;
    public plazoEnDias: number;
    public aumentoCapital: number;
    public fechaCancelacion: number;

    constructor(
        montoApertura: number,
        plazoEnDias: number,
        aumentoCapital: number,
        fechaCancelacion: number
    ){
        this.montoApertura = montoApertura;
        this.plazoEnDias = plazoEnDias;
        this.aumentoCapital = aumentoCapital;
        this.fechaCancelacion = fechaCancelacion;
    }
}
