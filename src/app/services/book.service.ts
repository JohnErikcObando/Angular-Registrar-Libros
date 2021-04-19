import { Injectable } from '@angular/core';
import { Books } from '../models/books.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookSubject = new Subject<Books>();

  bookLista: Books[] = [
    {
      libroId: 1,
      titulo: "Algotitmos",
      descripcion: "libro basico",
      precio: 18,
      autor: "John"
    },

    {
      libroId: 2,
      titulo: "CAlgotitmos2",
      descripcion: "libro basico2",
      precio: 12,
      autor: "John2"
    },

    {
      libroId: 3,
      titulo: "HAlgotitmos3",
      descripcion: "libro basico3",
      precio: 13,
      autor: "John3"
    },

    {
      libroId: 4,
      titulo: "BAlgotitmos4",
      descripcion: "libro basico4",
      precio: 14,
      autor: "John4"
    }
  ];

  constructor() { }

  obtenerLibros(){
    return this.bookLista.slice();
  }

  guardarLibro( book:Books){
      this.bookLista.push(book);
      this.bookSubject.next(book);
  }
}
