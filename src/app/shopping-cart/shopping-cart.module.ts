import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { CardsComponent } from './cards/cards.component';
import { PanierComponent } from './panier/panier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SaleComponent } from './sale/sale.component';
import { PipComponent } from './pip/pip.component';


@NgModule({
  declarations: [
    EcommerceComponent,
    CardsComponent,
    PanierComponent,
    SaleComponent,
    PipComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class ShoppingCartModule { }
