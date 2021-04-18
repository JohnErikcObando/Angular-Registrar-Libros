import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { BarraComponent } from './components/navegacion/barra/barra.component';
import { MenuListaComponent } from './components/navegacion/menu-lista/menu-lista.component';
import { SeguridadService } from './services/seguridad.service';
import { BookComponent } from './components/book/book.component';
import { BookService } from './services/book.service';
import { BookNuevoComponent } from './components/book/book-nuevo.components';
import { MAT_DATE_LOCALE } from '@angular/material/core';




@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    LoginComponent,
    InicioComponent,
    LibrosComponent,
    BarraComponent,
    MenuListaComponent,
    BookComponent,
    BookNuevoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [
    SeguridadService,
    BookService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],

  bootstrap: [AppComponent],

})
export class AppModule { }
