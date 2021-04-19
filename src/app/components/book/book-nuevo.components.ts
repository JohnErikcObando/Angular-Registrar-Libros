import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { Books } from 'src/app/models/books.model';
import { BookService } from '../../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { AutoresService } from 'src/app/services/autores.service';
import { Autor } from '../../models/autor.model';


@Component({
  selector: 'app-book.nuevo',
  templateUrl: 'book-nuevo.component.html'
})

export class BookNuevoComponent implements OnInit {

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  selectAutor: string;
  selectAutorTexto: string;
  fechaPublicacion: string;
  bookListas: Books[] = [];
  autores: Autor[] = [];

  constructor(private bookService: BookService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService) { }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue
  }


  ngOnInit() {
    this.autores = this.autoresService.obternerautores();
  }

  guardarLibro(form: NgForm) {

    if (form.valid) {

      this.bookService.guardarLibro({
        libroId: 1,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: this.selectAutorTexto,
        precio: form.value.precio,
        fechaPubliccion: new Date(this.fechaPublicacion)
      });
      this.dialogRef.closeAll();
    }

  }

}
