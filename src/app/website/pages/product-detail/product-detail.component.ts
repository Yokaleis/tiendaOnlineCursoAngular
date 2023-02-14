import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Location } from '@angular/common';

import { ProductsService } from 'src/app/services/products.service';

import { Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('id');
        if(this.productId) {
          return this.productsService.getProductDetail(this.productId)
        }
        return [ null ];
      })
    )
    .subscribe((data) => {
      this.product = data;
    });
  }

  goToBack(){
    this.location.back();
  }

}
