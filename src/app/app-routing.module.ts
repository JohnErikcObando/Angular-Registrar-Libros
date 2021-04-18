import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { SeguridadRouter } from './seguridad/seguridad.router';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [SeguridadRouter] },
  { path: 'libros', component: LibrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'books', component: BookComponent },
  // {path: '**', pathMatch:'full', redirectTo:'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SeguridadRouter]
})
export class AppRoutingModule { }
