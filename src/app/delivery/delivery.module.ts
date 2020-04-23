import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryPageRoutingModule } from './delivery-routing.module';

import { DeliveryPage } from './delivery.page';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryPageRoutingModule
  ],
  declarations: [DeliveryPage, VehicleDetailComponent, ThankyouComponent]
})
export class DeliveryPageModule {}
