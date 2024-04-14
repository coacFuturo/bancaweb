import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url_api_go;

@Injectable({
  providedIn: 'root',
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  getFacturas(identificacion: string): Observable<any> {
    return this.http.get(base_url + 'facturas/' + identificacion);
  }

}
