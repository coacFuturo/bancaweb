import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { movementsForm } from '../interfaces/movements-form.interface';
const base_url = environment.base_url + '/array/';
const url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public cuentas: object;
  public cuenta;
  constructor(private http: HttpClient) {}

  callConsolidated() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}consolidado`, {
      headers: { 'x-force': token },
    });
  }

  movimiento(formData: movementsForm, url: string = 'movimientoc') {
    const token = sessionStorage.getItem('token') || '';
    try {
      return this.http.post(base_url + url, formData, {
        headers: { 'x-force': token },
      });
    } catch (error) {
      console.log('Error ASM001');
    }
  }

  validateToken() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${url}/log/tokenvalidator`, {
      headers: { 'x-force': token },
    });
  }
}
