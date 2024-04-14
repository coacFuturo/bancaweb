export class Password {

    public password: string;
    public passwordV: string;

    constructor(
        password: string,
        passwordV: string
    ) {
        this.password = password;
        this.passwordV = passwordV;
    }
}

export class VerificacionPass {
    public password: string;

    constructor(
        password: string
    ) {
        this.password = password;
    }
}