import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-mapa-page',
  templateUrl: './mapa-page.component.html',
})
export class MapaPageComponent {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('marker') mapMarker!: MapMarker;

  cd = inject(ChangeDetectorRef);

  markerInfo: any;
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };
  markers = [
    {
      position: { lat: -25.533333, lng: -54.616667 },
      title: 'Itaipu Dam (Represa Hidroeléctrica Itaipú Binacional)',
      description: "One of the world's largest hydroelectric dams.",
    },
    {
      position: { lat: -25.508333, lng: -54.608333 },
      title: 'Friendship Bridge ( Puente de la Amistad)',
      description:
        'Bridge connecting Paraguay and Brazil over the Paraná River.',
    },
    {
      position: { lat: -25.527778, lng: -54.583333 },
      title: 'Shopping China Importados',
      description: 'Major shopping mall with a wide variety of imported goods.',
    },
    {
      position: { lat: -25.533333, lng: -54.591667 },
      title: 'Shopping Paris',
      description:
        'Another popular shopping mall known for electronics and clothing.',
    },
    {
      position: { lat: -25.525, lng: -54.577778 },
      title: 'Catedral San Blas',
      description: 'Beautiful cathedral in the city center.',
    },
    {
      position: { lat: -25.533333, lng: -54.563889 },
      title: 'Parque Verde',
      description: 'Urban park with walking paths, playgrounds, and a lake.',
    },
    {
      position: { lat: -25.683333, lng: -54.483333 },
      title: 'Saltos del Monday (Monday Falls)',
      description: 'Scenic waterfalls located a short drive outside the city.',
    },
    {
      position: { lat: -25.580556, lng: -54.633056 },
      title: 'Hito Tres Fronteras (Triple Frontier Landmark)',
      description:
        'Landmark marking the borders of Paraguay, Argentina, and Brazil.',
    },
    // Iguazu Falls are technically across the border but a popular day trip
    {
      position: { lat: -25.695278, lng: -54.545278 },
      title: 'Iguazu Falls (Argentina Side)',
      description:
        "One of the world's most spectacular waterfalls (located in Argentina).",
    },
    // Another option across the border in Brazil
    {
      position: { lat: -25.700833, lng: -54.539167 },
      title: 'Iguazu Falls (Brazil Side)',
      description: 'Another view of the Iguazu Falls (located in Brazil).',
    },
  ];
  center: google.maps.LatLngLiteral = {
    lat: -25.48143701275906,
    lng: -54.66668507228658,
  };

  markerPositions: any[] = [];

  ngOnInit() {
    this.markers.map((marker) => {
      const oMarker = this.createMarker(marker);
      this.markerPositions.push(oMarker);
    });
  }

  createMarker(marker: any): google.maps.Marker {
    const oMarker = new google.maps.Marker();
    oMarker.setTitle(marker.title);
    oMarker.setPosition(marker.position);
    oMarker.setValues({
      describe: {
        description: marker.description,
        position: marker.position,
      },
    });
    return oMarker;
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
  }
}
