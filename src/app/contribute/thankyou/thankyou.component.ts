import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss'],
})
export class ThankyouComponent implements OnInit {

  selectedOption: string

  constructor(private route: Router) { }

  ngOnInit() {}

  doNavigate(){
    console.log(this.selectedOption);
    this.route.navigate([this.selectedOption=="Yes"?"orphanage":"home/activity"]);
  }

}
