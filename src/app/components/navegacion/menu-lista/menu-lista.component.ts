import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter<void>();

  estadoUsuario: boolean;
  usuarioSubscrition: Subscription;

  constructor(private seguridadService: SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubscrition = this.seguridadService.seguridadCambio.subscribe(status => {
      this.estadoUsuario = status;
    });
  }

  onCerrarMenu() {
    this.menuToggle.emit();
  }

  terminarSesionMenu() {
    this.onCerrarMenu();
    this.seguridadService.salirSesion();
  }

  ngOnDestroy() {
    this.usuarioSubscrition.unsubscribe();
  }


}
