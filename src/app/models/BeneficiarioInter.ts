export class BeneficiarioInter {

    public nombre: string;
    public email: string;
    public nick: string;
    public tipoIdentificacion: string
    public identificacion: string;
    public codigoConceptoTransferencia: string;
    public codigoTipoCuentaTransferencia: string;
    public secuencialInstitucionTransferencia: string;
    public numeroCuentaBeneficiario: string;
    public _id: string;

    constructor(
        nombre: string,
        email: string,
        nick: string,
        tipoIdentificacion: string,
        identificacion: string,
        codigoConceptoTransferencia: string,
        codigoTipoCuentaTransferencia: string,
        secuencialInstitucionTransferencia: string,
        numeroCuentaBeneficiario: string,
        _id: string
    ) {
        this.nombre = nombre;
        this.email = email;
        this.nick = nick;
        this.tipoIdentificacion = tipoIdentificacion;
        this.identificacion = identificacion;
        this.codigoConceptoTransferencia = codigoConceptoTransferencia;
        this.codigoTipoCuentaTransferencia = codigoTipoCuentaTransferencia;
        this.secuencialInstitucionTransferencia = secuencialInstitucionTransferencia;
        this.numeroCuentaBeneficiario = numeroCuentaBeneficiario;
        this._id = _id;
    }

}