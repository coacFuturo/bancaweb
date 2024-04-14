import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Beneficiario, One } from '../models/Beneficiario';
import { Transferencia } from '../models/Transferencia';
import { BeneficiarioInter } from '../models/BeneficiarioInter';
import { TransferenciaInt } from '../models/TransferenciaInt';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class TransferenciaService {
  constructor(private http: HttpClient) { }

  getOneBeneficiario(data: One) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/transfer/beneficiario`, data, {
      headers: { 'x-force': token },
    });
  }

  createTranferenciaInt(data: TransferenciaInt) {
    const token = sessionStorage.getItem('token');
    console.log(data)
    return this.http.post(`${base_url}/transfer/externa`, data, {
      headers: { 'x-force': token },
    });
  }

  deleteBeneficiarioInt(id: string) {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/transfer/delete/beneficiarioexterno/${id}`, {
      headers: { 'x-force': token },
    });
  }

  getBeneficiariosIn() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/transfer/beneficiariosexternos`, {
      headers: { 'x-force': token },
    });
  }

  createBenficiarioIn(data: BeneficiarioInter) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/transfer/register/beneficiarioexterno`, data, {
      headers: { 'x-force': token },
    });
  }

  getInstituciones(tipo) {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/transfer/instituciones/${tipo}`, {
      headers: { 'x-force': token },
    });
  }

  getTipoInstitucion() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/transfer/tipoinstitucion`, {
      headers: { 'x-force': token },
    });
  }

  getTipoCuenta() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/transfer/tipocuenta`, {
      headers: { 'x-force': token },
    });
  }

  getConcepto() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/transfer/concepto`, {
      headers: { 'x-force': token },
    });
  }

  getComprobantes() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/transfer/comprobantes`, {
      headers: { 'x-force': token },
    });
  }

  createTranferencia(data: Transferencia) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/transfer/interna`, data, {
      headers: { 'x-force': token },
    });
  }

  deleteBeneficiario(id: string) {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/transfer/delete/beneficiarioi/${id}`, {
      headers: { 'x-force': token },
    });
  }

  createBenficiario(data: Beneficiario) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/transfer/register/beneficiarioi`, data, {
      headers: { 'x-force': token },
    });
  }

  solicitarCodigo() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/user/renewcheck`, {
      headers: { 'x-force': token },
    });
  }

  allBeneficiarios() {
    const token = sessionStorage.getItem('token');
    return this.http.get(`${base_url}/transfer/beneficiarios`, {
      headers: { 'x-force': token },
    });
  }

  verificarCodigo(data) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/log/check`, data, {
      headers: { 'x-force': token },
    });
  }

}
