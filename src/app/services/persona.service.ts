import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url_api_credito_online;

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = base_url;
  }

  getPorIdentificacion(identificacion): Observable<any> {
    return this._http.get(this.url + 'persona-identificacion/' + identificacion);
  }

}
