export class SimuladorCredito {

    public tipoPrestamo: string;
    public tipoTabla: string;
    public segmentoInterno: string;
    public subcalificacion: string;
    public fecha: string;
    public monto: string;
    public diaFijo: number;
    public numCuotas: number;
    public frecuenciaPago: string;

    constructor(
        tipoPrestamo: string,
        tipoTabla: string,
        segmentoInterno: string,
        subcalificacion: string,
        fecha: string,
        monto: string,
        diaFijo: number,
        numCuotas: number,
        frecuenciaPago: string
    ){
        this.tipoPrestamo = tipoPrestamo;
        this.tipoTabla = tipoTabla;
        this.segmentoInterno = segmentoInterno;
        this.subcalificacion = subcalificacion;
        this.fecha = fecha;
        this.monto = monto;
        this.diaFijo = diaFijo;
        this.numCuotas = numCuotas;
        this.frecuenciaPago = frecuenciaPago;
    }
}