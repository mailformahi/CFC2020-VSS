import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrphanagePage } from './orphanage.page';
import { OrphanagecatalogComponent } from './orphanagecatalog/orphanagecatalog.component';

const routes: Routes = [
  {
    path: 'orphanage',
    component: OrphanagePage
  },
  { path: '', component: OrphanagecatalogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrphanagePageRoutingModule {}
