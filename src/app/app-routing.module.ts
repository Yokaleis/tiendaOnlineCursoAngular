import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { QuicklinkStrategy } from "ngx-quicklink";

import { NotFoundComponent } from './not-found/not-found.component';

import { CustomPreloadService } from "./services/custom-preload.service";

import { AdminGuard } from "./guards/admin.guard";





const routes: Routes = [
  {
    path: '',
    //Esto nos permite hacer la carga peresoza y cody spilling
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  // Renderizando el modulo cms o modulo de administracion
  {
    path: 'cms',
    canActivate: [AdminGuard],
    //Esto nos permite hacer la carga peresoza y cody spilling
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //Habilitamos la precarga de los modulos una vez haga el render inicial
    //Esta tecnica es utilizada para sitios que tienen pocos modulos
    //preloadingStrategy: PreloadAllModules

    //preloadingStrategy: CustomPreloadService //Esta precarga es personalizada

    //Esta estrategia debe ser habilitada en cada modulo que sea requerido precargar
    //Por ejemplo, en website.module.ts
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
