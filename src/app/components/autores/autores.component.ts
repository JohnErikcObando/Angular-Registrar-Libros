import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from '../../models/autor.model';
import { AutoresService } from '../../services/autores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit, OnDestroy {

  desplegarColumnas: string[] = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();

  private autorSubscription: Subscription;

  constructor(private autoresService: AutoresService) { }

  ngOnInit(): void {

    this.autoresService.obternerautores();
    this.autorSubscription = this.autoresService.obternerActualListener()
      .subscribe((autores: Autor[]) => {
        this.dataSource.data = autores;
      })
  }

  ngOnDestroy() {
    this.autorSubscription.unsubscribe();
  }

}
