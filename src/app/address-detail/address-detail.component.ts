import { Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../Model/address';
import { Personal } from '../Model/personal';
import { HelperDetails } from '../Model/helper-details';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';

import {} from 'googlemaps';
import { GeoLocationService } from 'src/app/service/geo-location.service';
import { CrisisServiceService } from '../service/crisis-service.service';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss'],
})
export class AddressDetailComponent implements OnInit, AfterViewInit  {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

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

  map: google.maps.Map<any>;
  latLng:any;
  markers:any;
  // mapOptions:any;  
  isKM:any=100;
  

  lat: any;
  lng: any;
  coordinates: any;
  // mapOptions: any;

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
   };

  marker: any;

  locationSelected: boolean = false;

  constructor(private geolocation : Geolocation, private ngZone: NgZone, 
    private route: Router, private geolocationFinder: GeoLocationService) { }

  ngOnInit() {
    // this.loadMap();
  }

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

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

   ngAfterViewInit() {
    // this.mapInitializer();
   }
  
  loadMap(){
    // alert("test1");
    this.geolocation.getCurrentPosition().then((position) => {
    this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log('latLng',this.latLng);
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      this.coordinates = new google.maps.LatLng(this.lat, this.lng);
      // this.mapOptions=  google.maps.MapOptions = {
      //   center: this.coordinates,
      //   zoom: 8,
      // };
      this.mapOptions = {
        center: this.coordinates,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }   
      this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    
      this.marker = new google.maps.Marker({
        position: this.coordinates,
        map: this.map,
      });
      this.marker.setMap(this.map);

      // this.mapInitializer();
      // this.mapOptions = {
      //   center: this.latLng,
      //   zoom: 14,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // }   
      // this.mapTemp = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      // console.log(this.mapTemp);
      // this.foundations = this.geolocationFinder.nearbyPlace(this.map, this.latLng);
      // console.log(this.foundations);
    }, (err) => {
      alert('err '+err);
    });
  }

}
