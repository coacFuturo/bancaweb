import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IpHistorial } from '../models/iphistorial';
const base_url = environment.base_url_api_go;

@Injectable({
  providedIn: 'root',
})
export class ObtenerdatosipService {

  constructor(private http: HttpClient) { }

  ipget(): Observable<any> {
    return this.http.get('https://ipinfo.io/?token=efed4cd8a79c73');
  }

  getAll(identificacion): Observable<any> {
    return this.http.get(base_url + 'historial-ip/' + identificacion);
  }

  agregarVisitaUser(data: IpHistorial): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(base_url + 'historial-ip', params, { headers: headers });
  }

}
