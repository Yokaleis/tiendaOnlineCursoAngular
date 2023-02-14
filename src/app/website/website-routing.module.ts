import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* PAGES */
import { HomeComponent } from './pages/home/home.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from "./components/layout/layout.component";

/*GUARDIANS*/
import { AuthGuard } from "./../guards/auth.guard";



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo:'/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        //chunks, solo cargara cuando se necesite
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        data: {
          preload: true,
        }
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      },
      {
        path: 'carrito',
        component: MycartComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'profile',
        canActivate: [ AuthGuard ],
        component: ProfileComponent
      },
      {
        path: 'recovery',
        component: RecoveryComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
