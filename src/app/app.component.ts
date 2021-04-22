import { Component, OnInit } from '@angular/core';
import { SeguridadService } from './services/seguridad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mi-web-app';
  abrirMenu = false;

  constructor( private seguridadService: SeguridadService){ }

  ngOnInit(){
    this.seguridadService.cargarUsuario();
  }
}
