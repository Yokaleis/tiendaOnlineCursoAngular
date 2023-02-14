import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}
 
  //Este es el metodo que se va a ejecutar cada que ocurra una peticion
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Queremos evaluar la hora en la que inicio la peticion para ello creamos esta constante
    const start = performance.now(); //Performance es una utilidad del navegador
    return next
    .handle(request)
    .pipe(
      tap(() => {
        const time = (performance.now() - start) + 'ms';
        console.log(request.url, time);
      })
    );//El operador tap nos deja correr un proceso sin tener que cambiar la respuesta que nos envia el obserbable
  }
}
