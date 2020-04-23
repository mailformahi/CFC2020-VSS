import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContributePage } from './contribute.page';
import { ProductsComponent } from './products/products.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { AddressDetailComponent } from '../address-detail/address-detail.component';


const routes: Routes = [
  { path: 'contribute', component: ContributePage },
  // { path: '', component: AddressDetailComponent },
  { path: 'product', component: ProductsComponent},
  { path: 'thankyou', component:ThankyouComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContributePageRoutingModule {}
