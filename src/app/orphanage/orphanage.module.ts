import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrphanagePageRoutingModule } from './orphanage-routing.module';

import { OrphanagePage } from './orphanage.page';
import { OrphanagecatalogComponent } from './orphanagecatalog/orphanagecatalog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrphanagePageRoutingModule
  ],
  declarations: [OrphanagePage, OrphanagecatalogComponent],
})
export class OrphanagePageModule {}
