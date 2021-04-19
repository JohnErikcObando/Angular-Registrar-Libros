import { Injectable } from '@angular/core';
import { Autor } from '../models/autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  private autoresLista: Autor[] = [
    { autorId: 1, nombre: 'john', apellido: 'obando', gradoAcademico: 'Ingeniero de sistemas' },
    { autorId: 2, nombre: 'edwin', apellido: 'Ramirez', gradoAcademico: 'Ingeniero de sistemas' },
    { autorId: 3, nombre: 'fabian', apellido: 'obando', gradoAcademico: 'Ingeniero de sistemas' },
    { autorId: 4, nombre: 'felipe', apellido: 'llanos', gradoAcademico: 'Ingeniero de sistemas' },
  ];

  constructor() { }

  obternerautores() {
    return this.autoresLista.slice();
  }

}
