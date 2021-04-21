
import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { LoginData } from '../models/loginData.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class SeguridadService {

  private token: string;
  baseURl = environment.baseUrl;

  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario;


  obtenertoken() {
    return this.token;
  }

  constructor(
    private router: Router,
    private http: HttpClient) { }

  registrarUsuario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellido: usr.apellido,
      username: usr.username,
      password: '',
      token: usr.token
    };
    this.seguridadCambio.next(true);
    this.router.navigate(['/']);
  }

  login(loginData: LoginData) {

    console.log('servicio', loginData);

    this.http.post<Usuario>(this.baseURl + '/usuario/login', loginData)
      .subscribe((response) => {
        console.log('login respuesta', response);

        this.token = response.token;
        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          token: this.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId,
        }

        this.seguridadCambio.next(true);
        this.router.navigate(['/']);

      });
  }

  salirSesion() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obternerUsuario() {
    return { ... this.usuario }
  }

  onSesion() {
    return this.usuario != null;
  }

}
