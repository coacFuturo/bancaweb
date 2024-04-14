import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Visita } from '../models/Visita';
const base_url = environment.base_url_api_go;

@Injectable({
  providedIn: 'root',
})
export class VisitasService {

  constructor(private http: HttpClient) { }

  agregarVisitaUser(data: Visita): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(base_url + 'agregarvisitabilletera', params, { headers: headers });
  }

  aumentarUsuarios(): Observable<any> {
    return this.http.get(base_url + 'billeterausuario-aumentar');
  }

}
