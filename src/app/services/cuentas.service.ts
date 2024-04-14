import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root',
})
export class CuentasService {

    constructor(private http: HttpClient) { }

    tiposCuentasDeCliente(): Observable<any> {
        const token = sessionStorage.getItem('token');
        return this.http.get(`${base_url}/cuentas/tipo-cuentas-porcliente`, {
            headers: { 'x-force': token },
        });
    }

    cuentaOne(secuencialCuenta: number): Observable<any> {
        let params = JSON.stringify({ secuencialcuenta: secuencialCuenta });
        const token = sessionStorage.getItem('token') || '';

        return this.http.post(`${base_url}/cuentas/cuentaone`, params, {
            headers: {
                'x-force': token,
                "Content-Type": "application/json",
            },

        });
    }

}
