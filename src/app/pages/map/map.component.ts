import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { HomeObserverService } from '../../core/services/home-observer.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor(private observerService: HomeObserverService) { }

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  marker: google.maps.Marker;
  empresa: Empresa;

  ngOnInit(): void {
    this.observerService.empresaDestino.subscribe(res => {
      this.empresa = res;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.empresa.latitud, lng: this.empresa.longitud },
        zoom: 18
      });
      this.marker = new google.maps.Marker({
        position: { lat: this.empresa.latitud, lng: this.empresa.longitud },
      })
      this.marker.setMap(this.map);
    });
  }
}
