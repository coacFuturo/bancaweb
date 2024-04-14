import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Password, VerificacionPass } from '../models/Pasword';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usuario;
  constructor(private http: HttpClient, private router: Router) {}

  tokenValidate(): Observable<boolean> {
    const token = sessionStorage.getItem('token') || '';
    return this.http
      .get(`${base_url}/log/renewtoken`, {
        headers: { 'x-force': token },
      })
      .pipe(
        tap((resp: any) => {
          const { nombre, nick, img, oficina, role, c } = resp.user;
          this.usuario = new User('', nombre, '', nick, img, oficina, role, c);
          sessionStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  verificarPassword(data: VerificacionPass) {
    const token = sessionStorage.getItem('token');
    try {
      return this.http.post(`${base_url}/user/validate`, data, {
        headers: { 'x-force': token },
      });
    } catch (error) {
      console.log('Error USV001');
    }
  }

  createPassword(data: Password) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${base_url}/user/pass`, data, {
      headers: { 'x-force': token },
    });
  }

  createUSer(formData: RegisterForm) {
    return this.http.post(`${base_url}/user/register`, formData).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      })
    );
  }

  callUser(formData: LoginForm) {
    return this.http.post(`${base_url}/log/login`, formData).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
