import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product, CreareProductDTO, updateProductDTO} from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api';
  constructor(
    private http: HttpClient
  ) { }
  
  getByCategory(categoryId: string, limit?: number, offset?: number) {

    let params = new HttpParams();
    if (limit && offset ) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params });
  }

  getTodosProductos(limit?: number, offset?: number) {
    //Hacemos el tipado en la llamada a la api para que sepa que products es un objeto
    //Este codigo pertener al curso de componentes y servicios
    //return this.http.get<Product[]>('https://fakestoreapi.com/products');

    let params = new HttpParams();
    if (limit && offset ) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }

  getProductDetail(id: String) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  //Al crear metodos basta solamente con colocarles un nombre mas sencillo omitiendo palabras como producto, blog, etc porque al ser esto un servivio PARA producto viene implicito.
  /**El metodo post es para crear un producto desde el body, le enviamos la data (dto) de nuestra interface product.
   * Le enviamos un dto y ella (api) nos devuelve un producto**/
  create(dto: CreareProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  /**PUT: Enviamos toda la informacion - no importa que solo se haya cambiado un valor/atributo
   * PATCH: Enviamos solo la informacion que se modifica
   * Es una buena practica usar PUT :) **/
  //Como argumentos pasamos el id del producto a editar y el dto
  update(id: string, dto: updateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  /**En el caso de esta API, no devuelve el producto si no un boleano asi que el tipado de respuesta es <boolean>**/
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  /**PAGINACION**/
  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset}
    });
  }
}
