import { Books } from './books.model';

export interface PaginationBook{
    pagesize: number;
    page: number;
    sort: string;
    sortDirection: string;
    pagesQuantity: number;
    data: Books[];
    filterValue:{};
    totalRows: number;
}
