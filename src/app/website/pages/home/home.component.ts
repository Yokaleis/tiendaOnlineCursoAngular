import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from "src/app/services/products.service";
import { Product} from 'src/app/models/product.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    /*Traemos todos los productos*/
    this.productsService.getTodosProductos(10, 0)
    .subscribe(data => {
      //console.log(data);
      this.products = data;
      this.offset += this.limit
    });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId);
    })

    //this.onLoadMore;

  }
  
  onLoadMore() {
    this.productsService.getTodosProductos(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit
    })
  }




}

