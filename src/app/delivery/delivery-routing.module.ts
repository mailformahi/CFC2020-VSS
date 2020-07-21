import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryPage } from './delivery.page';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PickupsComponent } from './pickups/pickups.component';


const routes: Routes = [
  {
    path: 'delivery',
    component: DeliveryPage
  },
  { path: 'vehicle', component: VehicleDetailComponent},
  { path: 'pickuplocation', component: PickupsComponent},
  { path: 'thankyou', component:ThankyouComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPageRoutingModule {}
