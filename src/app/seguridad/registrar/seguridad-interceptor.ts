import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SeguridadService } from '../../services/seguridad.service';


@Injectable()

export class SeguridadInterceptor implements HttpInterceptor {

  constructor(private seguridadService: SeguridadService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenseguridad = this.seguridadService.obtenertoken();
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer' + tokenseguridad)
    });

    return next.handle(request);
  }
}
