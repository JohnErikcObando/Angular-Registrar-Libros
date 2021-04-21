import { Injectable } from '@angular/core';
import { Books } from '../models/books.model';
import { Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBook } from '../models/pagination-book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.baseUrl;

  bookSubject = new Subject();

  bookLista: Books[] = [];

  bookPagination: PaginationBook;
  bookPaginationSubject = new Subject<PaginationBook>();

  constructor(private http: HttpClient) { }

  obtenerLibros(libroPorPagina: Number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {
    const request = {
      pageSize: libroPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };

    this.http.post<PaginationBook>(this.baseUrl + '/api/Libro/Pagination', request)
      .subscribe((response) => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });

  }

  obtenerActualListener() {
    return this.bookPaginationSubject.asObservable();
  }

  guardarLibro(book: Books) {
    this.http.post(this.baseUrl + '/api/Libro', book)
      .subscribe((response) => {
        this.bookSubject.next(book);
      });
  }

  guardarLibroListener() {
    return this.bookSubject.asObservable();
  }
}
