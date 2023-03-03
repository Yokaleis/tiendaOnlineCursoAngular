import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



/* PAGES */
import { NavegationComponent } from "./components/navegation/navegation.component";
const routes: Routes = [
  {
    path: '',
    component: NavegationComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
