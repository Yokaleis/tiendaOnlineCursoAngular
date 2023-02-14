import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  constructor() { }

  //Metodo para crear una precarga personalizada, esta se puede usar para proyectos con muchos modulos
  //Y evitar la sobrecarga del hilo principal
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    //Con este if escogemos cual ruta precargar primero, todas las
    if(route.data && route.data['preload']){
      return load();
    }
    //Si no enviamos un observable en vacio, solo las rutas que tengan data y la bandera del preload en true seran precargadas
    return of(null);
  }
}
