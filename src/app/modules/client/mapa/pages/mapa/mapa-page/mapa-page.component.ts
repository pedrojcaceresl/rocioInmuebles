import { Component } from '@angular/core';
import {GoogleMap, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-mapa-page',
  templateUrl: './mapa-page.component.html',
  styleUrls: ['./mapa-page.component.scss']
})
export class MapaPageComponent {
 // Configura las coordenadas del mapa
//  center = {lat: -25.48143701275906, lng: -54.66668507228658};
center: google.maps.LatLngLiteral = {lat: -25.48143701275906, lng: -54.66668507228658};
zoom = 4;
markerOptions: google.maps.MarkerOptions = {draggable: false};
markerPositions: google.maps.LatLngLiteral[] = [];

addMarker(event: google.maps.MapMouseEvent) {
  // this.markerPositions.push(event.latLng.toJSON());
  console.log("PRITOOO", event)
}
}
