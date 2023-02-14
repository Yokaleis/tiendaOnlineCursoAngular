import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { StoreService } from "src/app/services/store.service";

import { CategoriesService } from 'src/app/services/categories.service';

import { Category } from 'src/app/models/category.model';

import { AuthService } from "../../../services/auth.service";

import { User } from "../../../models/users.models";

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css']
})
export class NavegationComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  categories: Category[] = [];
  //Guardar el token en memoria
  token= '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.carritoCompras$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data
    });
  }

  login() {
    this.authService.loginAndGet('john@mail.com','changeme')
    .subscribe(rta => {
      this.router.navigate(['/profile']);
    });
  } 
  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);

  }


}
