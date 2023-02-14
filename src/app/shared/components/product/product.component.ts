/**COMPONENTE HIJO**/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../../models/product.models';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  /* Este arreglo de productos esta siendo renderizado desde el componente padre, por eso utilizamos el @Input() */
  @Input() product: Product = {
    id:   '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
    }
  }
  /*Otra solucion  @Input('product') product!: Product; con el signo de exclamacion angular interpreta que la propiedad product no puede ser nula */

  /*Queremos informar al padre que producto se esta agregando */
  @Output() addProduct = new EventEmitter<Product>();
  @Output() verDetalleProduct = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  agregarAlCarrito() {
    /*Escuchamos el evento addProduct dentro del padre */
    this.addProduct.emit(this.product);
  }

  verDetalle() {
    this.verDetalleProduct.emit(this.product.id);
  }

}
