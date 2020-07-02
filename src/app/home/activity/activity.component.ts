import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContributePage } from 'src/app/contribute/contribute.page';
import { DeliveryPage } from 'src/app/delivery/delivery.page';
import { OrphanagePage } from 'src/app/orphanage/orphanage.page';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {

  selectedOption: string
  tab1Root = ContributePage;
  tab2Root = DeliveryPage;
  tab3Root = OrphanagePage;

  constructor(private route: Router) { }

  ngOnInit() {}

  doNavigate(type){
    localStorage.setItem("cType",type);
    this.route.navigate([type=="delivery"?"delivery/address":"contribute/address"]);
  }
  

}
