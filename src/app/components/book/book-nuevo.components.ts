import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { Books } from 'src/app/models/books.model';
import { BookService } from '../../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { AutoresService } from 'src/app/services/autores.service';
import { Autor } from '../../models/autor.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-book.nuevo',
  templateUrl: 'book-nuevo.component.html'
})

export class BookNuevoComponent implements OnInit, OnDestroy {

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  selectAutor: string;
  selectAutorTexto: string;
  fechaPublicacion: string;
  bookListas: Books[] = [];
  autores: Autor[] = [];

  autorSubscription: Subscription;

  constructor(
    private bookService: BookService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService) { }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue
  }


  ngOnInit() {
    // this.autores = this.autoresService.obternerautores();

    this.autoresService.obternerautores();
    this.autorSubscription = this.autoresService
      .obternerActualListener()
      .subscribe((autoresBackend: Autor[]) => {
        this.autores = autoresBackend;
      })
  }

  guardarLibro(form: NgForm) {

    if (form.valid) {

      const autorRequest = {
        id: this.selectAutor,
        nombrecompleto: this.selectAutorTexto
      };

      const libroRequest = {
        _id: null,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        precio: parseInt(form.value.precio),
        fechaPubliccion: new Date(this.fechaPublicacion),
        autor: autorRequest
      }

      this.bookService.guardarLibro(libroRequest),
        this.autorSubscription = this.bookService.guardarLibroListener()
          .subscribe(() => {
            this.dialogRef.closeAll();
          })

    }
  }

  ngOnDestroy() {
    this.autorSubscription.unsubscribe();
  }

}
