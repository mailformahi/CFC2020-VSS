import { Injectable, NgZone, ElementRef } from '@angular/core';

import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';

import {} from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  map:any;
  latLng:any;
  markers:any;
  mapOptions:any;  
  isKM:any=100;
  isType:any="foundation";
  foundations: any[] = [];

  constructor(private geolocation : Geolocation, private ngZone: NgZone ) { }

  loadMap(mapElement: ElementRef){

    this.geolocation.getCurrentPosition().then((position) => {
    this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log('latLng',this.latLng);
      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }   
      this.map = new google.maps.Map(mapElement.nativeElement, this.mapOptions);

    }, (err) => {
      alert('err '+err);
    });

  }
  nearbyPlace(map: any, latLng): any[]{
    // this.loadMap();
    this.markers = [];
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: latLng,
        radius: this.isKM,
        types: [this.isType]
      }, (results, status) => {
          this.callback(results, status);
          this.foundations = results;
      });
      return this.foundations;
  }

  callback(results, status) {
    console.log(status);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        // this.createMarker(results[i]);
      }
    }
  }

  createMarker(place){
    var placeLoc = place;
    console.log('placeLoc',placeLoc);
    this.markers = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location
    });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(this.markers, 'click', () => {
      this.ngZone.run(() => {
        infowindow.setContent(place.name);
        infowindow.open(this.map, this.markers);
      });
    });
  }
}
