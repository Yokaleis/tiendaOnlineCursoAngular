/**COMPONENTE PADRE**/
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, CreareProductDTO, updateProductDTO } from 'src/app/models/product.models';

/**INYECCION DE SERVICIO**/
import { ProductsService } from "src/app/services/products.service";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  /*Esta es la lista de los productos agregado al carrito, inicialmente esta vacia*/
  listaProductos: Product[] = [];

  /**Calculando el total**/
  total: Number = 0;

  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter();


  @Input()
  set productId(id: string | null){
    if(id){
      this.detalleProdutPadre(id);
    }
  }

  showProductDetail = false;
  galeryProducts: Product = {
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

  constructor(
    //De esta manera usamos el servicio inyectable
    private storeService: StoreService,
    private productsService: ProductsService
  ) { 
    this.listaProductos = this.storeService.getListadeProducto();
  }

  productoAgregado(product: Product) {
    //console.log(product);
    this.storeService.agregaProducto(product);
    //Sumamos el precio de los productos
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  detalleProdutPadre(id: String) {
    this.productsService.getProductDetail(id)
    //El layout no aparecera antes de que se reciba la info de la api y se seleccione el producto
    .subscribe (data => {
      //console.log('Detalle', data)
      //Cuando recibamos la informacion pasara esto
      if(!this.showProductDetail){
        this.showProductDetail = true;
      }
      this.galeryProducts = data;
    })
  }

  crateNewProduct() {
    const product: CreareProductDTO = {
      title: 'Nuevo producto creado',
      description: 'Ropa',
      price: 58,
      images: ['https://placeimg.com/640/480/any'],
      categoryId: 5
    }
    this.productsService.create(product)
    .subscribe( data => {
      console.log('Se creo el siguiente producto', data);
      //Para incertar nuestro producto al arreglo de producto o interface
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const cambios: updateProductDTO = {
      title: 'Hola, soy un nuevo producto 🍟',
      description: 'Estoy probando la edicion del producto😁'
    }
    const id = this.galeryProducts.id;
    this.productsService.update(id, cambios)
    .subscribe(data => {
      //Actualiza la data en la interface
      const productIndex = this.products.findIndex(item => item.id === this.galeryProducts.id);
      //Pone la informacion actualizada en ese producto
      this.products[productIndex] = data;
      this.galeryProducts = data;
      console.log('Data actualizada', data);
    })
  }

  deleteProduct() {
    //Necesitamos el id que hemos seleccionado para borrar
    const id = this.galeryProducts.id;
    this.productsService.delete(id)
    .subscribe(() => {
      //Necesitamos el index para saber cual remover
      const productIndex = this.products.findIndex(item => item.id === this.galeryProducts.id);
      //Especificamos cual es la posicion del elemento a eliminar y cuantos elementos eliminar A PARTIR DE ESE, ES DECIR 1.
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }


}
