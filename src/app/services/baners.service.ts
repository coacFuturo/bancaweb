import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url_api_go;

@Injectable({
  providedIn: 'root',
})
export class BanersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(base_url + 'baner-billetera');
  }

}
