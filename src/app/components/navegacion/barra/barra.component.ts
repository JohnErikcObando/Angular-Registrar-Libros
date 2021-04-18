import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter<void>();

  estadoUsuario: boolean;
  usuarioSubcription: Subscription;

  constructor( private seguridadService:SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubcription = this.seguridadService.seguridadCambio.subscribe(status => {
        this.estadoUsuario = status;
    });
  }

  ngOnDestroy(){
      this.usuarioSubcription.unsubscribe();
  }

  onMenuToggleDispatch(){
    this.menuToggle.emit();
  }

  terminarSesion(){
    this.seguridadService.salirSesion();
  }

}
