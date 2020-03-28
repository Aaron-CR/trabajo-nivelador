import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { HomeObserverService } from '../../core/services/home-observer.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  @ViewChild('mapContainer') gmap: ElementRef;
  public map: google.maps.Map;
  public marker: google.maps.Marker;
  public empresa: Empresa;

  constructor(public observerService: HomeObserverService) { }

  ngOnInit(): void {
    this.observerService.empresaDestino.subscribe(res => {
      this.empresa = res;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.empresa.latitud, lng: this.empresa.longitud },
        zoom: 18
      });
      this.marker = new google.maps.Marker({
        position: { lat: this.empresa.latitud, lng: this.empresa.longitud },
      });
      this.marker.setMap(this.map);
    });
  }
}
