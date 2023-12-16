import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScategoriesRoutingModule } from './scategories-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ScategoriesRoutingModule,
    HttpClientModule,
  ]
})
export class ScategoriesModule { }
