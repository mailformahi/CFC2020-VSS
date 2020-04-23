import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../Model/address';
import { Personal } from '../Model/personal';
import { HelperDetails } from '../Model/helper-details';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss'],
})
export class AddressDetailComponent implements OnInit {

  address: Address;
  personal: Personal;

  honorific: string = "";
  firstName: string;
  lastName: string;
  gender: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;

  constructor(private route: Router) { }

  ngOnInit() {}

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  processAddressForm(form){
    this.personal = form.value;
    localStorage.setItem("personal",JSON.stringify(this.personal));
    
    if(localStorage.getItem("cType")=="contributor"){
      this.route.navigate(["/contribute/product"]);
    }else{
      this.route.navigate(["/delivery/vehicle"]);
    }

  }

}
