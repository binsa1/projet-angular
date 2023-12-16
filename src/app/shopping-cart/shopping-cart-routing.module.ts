import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { SaleComponent } from './sale/sale.component';
import { PipComponent } from './pip/pip.component';

const routes: Routes = [
  { path: 'ecommerce', component: EcommerceComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'pip', component: PipComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
