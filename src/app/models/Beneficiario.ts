export class Beneficiario {

    public email: string;
    public identificacion: string;
    public nick: string;
    public cuenta: string;

    constructor(
        email: string,
        identificacion: string,
        nick: string,
        cuenta: string
    ) {
        this.email = email;
        this.identificacion = identificacion;
        this.nick = nick;
        this.cuenta = cuenta;
    }
}

export class Verificacion {

    public checker: string;

    constructor(
        checker: string
    ) {
        this.checker = checker;
    }
}

export class One {
    public id: string;
    public interna: string;

    constructor(
        id: string,
        interna: string
    ) {
        this.id = id;
        this.interna = interna;
    }
}