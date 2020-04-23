import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ActivityComponent } from './activity/activity.component';
import { OtpaccessComponent } from './otpaccess/otpaccess.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      // { path: '', pathMatch: 'full', component: HomePage },
      { path: '', component: OtpaccessComponent },
      { path: 'activity', component: ActivityComponent },
    ])
  ],
  declarations: [HomePage, ActivityComponent, OtpaccessComponent]
})
export class HomePageModule {}
