import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { LayoutComponent } from './components/layout/layout.component';

import { NavegationComponent } from './components/navegation/navegation.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavegationComponent,
    BasicFormComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule
  ]
})
export class CmsModule { }
