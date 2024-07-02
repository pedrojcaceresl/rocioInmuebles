import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { FirebaseService } from '../../../../../../shared/services/firebase.service';
import { Router } from '@angular/router';
import { formatCurrency } from '../../../../../../core/helpers/index';


@Component({
  selector: 'app-mapa-page',
  templateUrl: './mapa-page.component.html',
})
export class MapaPageComponent {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('marker') mapMarker!: MapMarker;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  cd = inject(ChangeDetectorRef);
  markerPositions: any[] = [];
  propiedades: any;

  markerInfo: any;
  zoom = 7;

  formatCurrency = formatCurrency;

  TRANSACTION_TYPE = {
    ALQUILER: 'Alquiler',
    VENTA: 'Venta',
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
    icon: {
      url: 'assets/images/pin-map.png',
    },
  };
  markers: any[] = [];

  center: google.maps.LatLngLiteral = {
    lat: -25.48143701275906,
    lng: -54.66668507228658,
  };

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.firebaseService.getData('propiedades').subscribe((res) => {
      this.propiedades = res;
      this.loadMarkers();
    });
  }


  isForSale(property: any) {
    return property.transactionType === this.TRANSACTION_TYPE.ALQUILER
      ? property.priceMonth
      : property.priceSale;
  }

  loadMarkers() {
    this.propiedades.filter((marker: any) => marker.isActive);
    if (this.propiedades && this.propiedades.length) {
      this.propiedades.forEach((marker: any) => {
        const oMarker = this.createMarker(marker);
        this.markerPositions.push(oMarker);
      });
    }
  }

  createMarker(marker: any): google.maps.Marker {
    const oMarker = new google.maps.Marker();
    oMarker.setTitle(marker.title);
    oMarker.setPosition(marker.position);
    oMarker.setValues({
      describe: {
        description: marker.description,
        isOffer: marker.isOffer,
        position: marker.position,
        id: marker.id,
        ...marker,
      },
    });
    return oMarker;
  }

  goTo(marker: any) {
    this.router.navigate([`/propiedades/detalle/${marker.describe.id}`]);
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markers = [
      ...this.markers,
      {
        position: event.latLng!.toJSON(),
        description: '',
        title: '',
      },
    ];
  }

  openInfoWindow(marker: MapMarker, index: any) {
    this.infoWindow.open(marker);
    this.markerInfo = this.markerPositions[index];
    if (this.map) {
      this.map.googleMap?.setZoom(15); // Set your desired zoom level
      this.map.googleMap?.setCenter(marker.getPosition()!);
    }
  }
}
