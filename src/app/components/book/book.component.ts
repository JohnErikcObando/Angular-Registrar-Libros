import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Books } from '../../models/books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.components';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit {

  bookData: Books[] = [];
  desplegarColumns = ['libroId', 'titulo', 'descripcion', 'precio', 'autor'];
  dataSource = new MatTableDataSource<Books>();

  @ViewChild(MatSort) ordenamiento:MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;

  constructor(private bookService: BookService,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    // this.bookData = this.bookService.obtenerLibros();
    this.dataSource.data = this.bookService.obtenerLibros();
    console.log( this.bookService.obtenerLibros());

  }

  ngAfterViewInit(){
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion
  }


  hacerFiltro(filtro: string){
      this.dataSource.filter = filtro;
  }

  abrirDialog(){
    this.dialog.open(BookNuevoComponent,{
      width: '350px'
    });
  }



}
