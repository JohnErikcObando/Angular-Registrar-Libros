import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Books } from '../../models/books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.components';
import { Subscription } from 'rxjs';
import { PaginationBook } from '../../models/pagination-book.model';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;

  totalLibros = 0;
  librosPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = "titulo";
  sortDirection = 'asc';
  filterValue = null;
  timeout: any = null;
  bookData: Books[] = [];
  desplegarColumns = ['libroId', 'titulo', 'descripcion', 'precio', 'autor'];
  dataSource = new MatTableDataSource<Books>();

  private bookSubcrition: Subscription;

  constructor(private bookService: BookService,
    private dialog: MatDialog) {

  }

  eventoPaginador(event: PageEvent) {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.bookService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ordenarColumna(event) {
    this.sort = event.active;
    this.sortDirection = event.direction;

    this.bookService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ngOnInit(): void {

    this.bookService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );

    this.bookSubcrition = this.bookService
      .obtenerActualListener()
      .subscribe((pagination: PaginationBook) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalLibros = pagination.totalRows;
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion
  }


  hacerFiltro(event: any) {

    clearTimeout(this.timeout);
    var $this = this;

    this.timeout = setTimeout(() => {
      if (event.kyCode != 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value
        };

        this.filterValue = filterValueLocal;
        $this.bookService.obtenerLibros(
          $this.librosPorPagina,
          $this.paginaActual,
          $this.sort, $this.sortDirection,
          this.filterValue
        );

      }
    }, 1000);
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(BookNuevoComponent, {
      width: '500px'
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        this.bookService.obtenerLibros(
          this.librosPorPagina,
          this.paginaActual,
          this.sort,
          this.sortDirection,
          this.filterValue
        );
      });
  }

  ngOnDestroy() {
    this.bookSubcrition.unsubscribe();
  }

}
