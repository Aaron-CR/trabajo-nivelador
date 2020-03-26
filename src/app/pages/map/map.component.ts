import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  map: google.maps.Map;

  lat: number = 0;
  lng: number = 0;

  ngOnInit(): void {
  }

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
   }

   ngAfterViewInit() {

    this.mapInitializer();
  }
}
