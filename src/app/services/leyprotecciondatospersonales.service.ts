import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url_api_go;

@Injectable({
  providedIn: 'root',
})
export class LeyProteccionDatosPersonalesService {

  constructor(private http: HttpClient) { }

  verificarAceptacionDatosPersonal(identificacion: string): Observable<any> {
    return this.http.get(base_url + 'verificar-datos-personales/' + identificacion);
  }

  aceptarDatosPersonales(identificacion: string): Observable<any> {
    return this.http.get(base_url + 'aceptar-autorizacion-datos-personales/' + identificacion);
  }

}
