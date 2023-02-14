import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { ProductsService } from 'src/app/services/products.service';

import { Product } from 'src/app/models/product.models';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if(this.categoryId) {
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      })
    )
    .subscribe((data) => {
      this.products = data;
    });

    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

  onLoadMore() {
    if(this.categoryId){
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit
      });
    }
  }

}
