import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { Product } from 'src/app/models/product.models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  /*Esta es la lista de los productos agregado al carrito, inicialmente esta vacia*/
  private listaProductos: Product[] = [];
  /*Esto es como un estado copartido, permite compartir datos entre componentes de forma reactiva*/
  private carritoCompras = new BehaviorSubject<Product[]>([]);

  /*Esto es un observable*/
  carritoCompras$ = this.carritoCompras.asObservable();

  constructor() { }

  agregaProducto(product: Product) {
    this.listaProductos.push(product);
    this.carritoCompras.next(this.listaProductos);
  }

  getListadeProducto() {
    return this.listaProductos;
  }
  getTotal() {
    return this.listaProductos.reduce((sum, item) => sum + item.price, 0);
  }
}
