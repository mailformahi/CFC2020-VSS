import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/Model/vehicle';
import { CrisisServiceService } from 'src/app/service/crisis-service.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
})
export class VehicleDetailComponent implements OnInit {

  vehicleInfo: string
  vehicleRegNo: string
  proofType: string
  proofInfo: string
  vehicle: Vehicle

  constructor(private route: Router, private service: CrisisServiceService) { }

  ngOnInit() {}

  processVehicleForm(form){
    console.log(form.value);
    this.vehicle = form.value;
    localStorage.setItem("vehicleInfo",JSON.stringify(this.vehicle));
    var helperDetails = {"Type": localStorage.getItem("cType"), 
    "phone": localStorage.getItem("phone"),
    "helperDetail":[
      {"vehicleInfo": localStorage.getItem("vehicleInfo")},
      {"personal": localStorage.getItem("personal")}
    ]}
    // var helperDetails = {"helperDetail":[
    //   {"vehicleInfo": localStorage.getItem("vehicleInfo")},
    //   {"Type": localStorage.getItem("cType")},
    //   {"personal": localStorage.getItem("personal")},
    //   {"phone": localStorage.getItem("phone")}
    // ]}
    localStorage.setItem("helperDetail",JSON.stringify(helperDetails));
    this.service.submitCrisisData(JSON.parse(localStorage.getItem("helperDetail"))).subscribe(res => {
      console.log(res["result"]);
    });
    this.route.navigate(['/delivery/thankyou']);
  }

}
