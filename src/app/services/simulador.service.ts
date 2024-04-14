import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SimuladorCredito } from '../models/SimuladorCredito';
import { SimuladorInversion } from '../models/SimuladorInversion';
import { SimuladorAhorroPro } from '../models/SimuladorAhorro';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SimuladorService {
  constructor(private http: HttpClient) { }

  getTipoPrestamo() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/simulator/tipoprestamo`, {
      headers: { 'x-force': token },
    });
  }

  getTipoTabla(cod: string) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/simulator/tipotablas`, { codigo: cod }, {
      headers: { 'x-force': token },
    });
  }

  getSementoInterno(cod: string) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/simulator/segmentointerno`, { codigo: cod }, {
      headers: { 'x-force': token },
    });
  }

  getSubcalificacion(cod: string) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/simulator/subcalificacion`, { secuencial: cod }, {
      headers: { 'x-force': token },
    });
  }

  consultarCredito(data: SimuladorCredito) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/simulator/prestamo`, data, {
      headers: { 'x-force': token },
    });
  }

  tipoDeposito() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/simulator/tipodeposito`, {
      headers: { 'x-force': token },
    });
  }

  consultarSimuInversion(data: SimuladorInversion) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/simulator/inversion`, data, {
      headers: { 'x-force': token },
    });
  }

  consultarSimuAhorro(data: SimuladorAhorroPro) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/simulator/ahorroinversion`, data, {
      headers: { 'x-force': token },
    });
  }


}
