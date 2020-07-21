import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { Router } from '@angular/router';
import { HelperDetails } from 'src/app/Model/helper-details';
import { CrisisServiceService } from 'src/app/service/crisis-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  // helperDetails: string[]= [];

  products = [
    { val: 'Cooked Food', isChecked: false },
    { val: 'Raw Vegitables', isChecked: false },
    { val: 'Rice', isChecked: false },
    { val: 'Grocery', isChecked: false },
    { val: 'Milk', isChecked: false },
    { val: 'Biscuits', isChecked: false },
    { val: 'Sanitizer', isChecked: false },
    { val: 'Napkins', isChecked: false },
    { val: 'Masks', isChecked: false }
  ];

  colors = ["primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark"]

  constructor(private route: Router, private service:CrisisServiceService) { }

  ngOnInit() {}

  processProductForm(){
    console.log(this.products);
    var selectedValues: string[]= [];
    this.products.forEach((item)=>{
      if(item.isChecked){
        selectedValues.push(item.val);
        // helperDetail.items.push(item.val);
      }
    });
    console.log(selectedValues);
    localStorage.setItem("items",JSON.stringify(selectedValues));

    var helperDetails = {"type": localStorage.getItem("cType"), 
    "phone": localStorage.getItem("phone"),
    "helperDetail":[
      {"items": localStorage.getItem("items")},
      {"personal": localStorage.getItem("personal")}
    ]}
    // var helperDetails = {"helperDetail":[
    //     {"items": localStorage.getItem("items")},
    //     {"Type": localStorage.getItem("cType")},
    //     {"personal": localStorage.getItem("personal")},
    //     {"phone": localStorage.getItem("phone")}
    //   ]}
       
    localStorage.setItem("helperDetail",JSON.stringify(helperDetails));
    this.service.submitCrisisData(JSON.parse(localStorage.getItem("helperDetail"))).subscribe(res => {
      console.log(res["result"]);
    });
    this.route.navigate(['/contribute/thankyou']);
  }

}
