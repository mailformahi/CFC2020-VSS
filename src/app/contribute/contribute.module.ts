import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContributePageRoutingModule } from './contribute-routing.module';

import { ContributePage } from './contribute.page';
import { ProductsComponent } from './products/products.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
// import { AddressDetailComponent } from '../address-detail/address-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContributePageRoutingModule,
    // AddressDetailComponent
  ],
  declarations: [ContributePage, ProductsComponent, ThankyouComponent]
})
export class ContributePageModule {}
