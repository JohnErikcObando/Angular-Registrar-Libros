import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Books } from 'src/app/models/books.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book.nuevo',
  templateUrl: 'book-nuevo.component.html'
})

export class BookNuevoComponent implements OnInit {

  constructor( private bookService:BookService){ }

  @ViewChild(MatDatepicker) picker : MatDatepicker<Date>;
  selectAutor: string;
  bookListas: Books[] = [];

  ngOnInit(){
    this.bookListas = this.bookService.obtenerLibros();
  }

  guardarLibro(form: NgForm){

  }

}
