
import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { LoginData } from '../models/loginData.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class SeguridadService {

  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario;

  constructor(private router:Router) { }

  registrarUsuario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellido: usr.apellido,
      username: usr.username,
      password: ''
    };
    this.seguridadCambio.next(true);
    this.router.navigate(['/']);
  }

  login(loginData: LoginData) {
    this.usuario = {
      email: loginData.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: '',
      apellido: '',
      username: '',
      password: ''
    };
    this.seguridadCambio.next(true);
    this.router.navigate(['/']);
  }

  salirSesion() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obternerUsuario() {
    return { ... this.usuario }
  }

  onSesion(){
    return this.usuario!=null;
  }

}
