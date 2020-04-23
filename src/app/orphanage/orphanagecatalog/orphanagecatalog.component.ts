import { Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import { CrisisServiceService } from 'src/app/service/crisis-service.service';
import { Router } from '@angular/router';

import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';

import {} from 'googlemaps';
import { GeoLocationService } from 'src/app/service/geo-location.service';

@Component({
  selector: 'app-orphanagecatalog',
  templateUrl: './orphanagecatalog.component.html',
  styleUrls: ['./orphanagecatalog.component.scss'],
})
export class OrphanagecatalogComponent implements OnInit {

  @ViewChild('map', {static: false}) mapElement: ElementRef;

  map:any;
  latLng:any;
  markers:any;
  mapOptions:any;  
  isKM:any=100;
  isType:any="foundation";
  foundations: any[] = [];

  orphange: any[] = [
    { name: "", address:"", isChecked: false }
  ]
  location: string = "Coimbatore";
  colors = ["primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark"]


  constructor(private geolocation : Geolocation, private ngZone: NgZone, 
              private crisisService: CrisisServiceService, private route: Router, 
              private geolocationFinder: GeoLocationService) { }

  ngOnInit() {
    this.crisisService.getOrphanages(this.location).subscribe(data =>{
      console.log(data);
      this.orphange = data['result'];
      console.log(this.orphange);
    })
    this.loadMap();
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
    this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log('latLng',this.latLng);
      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }   
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      this.foundations = this.geolocationFinder.nearbyPlace(this.map, this.latLng);
      console.log(this.foundations);
    }, (err) => {
      alert('err '+err);
    });

  }

  // loadMap(){

  //   this.geolocation.getCurrentPosition().then((position) => {
  //   this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //     console.log('latLng',this.latLng);
  //     this.mapOptions = {
  //       center: this.latLng,
  //       zoom: 14,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }   
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

  //   }, (err) => {
  //     alert('err '+err);
  //   });

  // }


  processOrphanageForm(){
    console.log(this.orphange);
    var selectedValues: string[]= [];
    this.orphange.forEach((item)=>{
      if(item.isChecked){
        selectedValues.push(item.name);
        // helperDetail.items.push(item.val);
      }
    });
    console.log(selectedValues);
    localStorage.setItem("items",JSON.stringify(selectedValues));

    // var helperDetails = {"Type": localStorage.getItem("cType"), "helperDetail":[
    //   {"items": localStorage.getItem("items")},
    //   {"personal": localStorage.getItem("personal")},
    //   {"phone": localStorage.getItem("phone")}
    // ]}
    // var helperDetails = {"helperDetail":[
    //     {"items": localStorage.getItem("items")},
    //     {"Type": localStorage.getItem("cType")},
    //     {"personal": localStorage.getItem("personal")},
    //     {"phone": localStorage.getItem("phone")}
    //   ]}
       
    // localStorage.setItem("helperDetail",JSON.stringify(helperDetails));
    // this.service.submitCrisisData(JSON.parse(localStorage.getItem("helperDetail"))).subscribe(res => {
    //   console.log(res["result"]);
    // });
    // this.route.navigate(['/contribute/thankyou']);

  }

  
}
