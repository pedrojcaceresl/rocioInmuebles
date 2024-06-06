import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa.component';
import { MapaPageComponent } from './pages/mapa-page/mapa-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
import { MapaRoutingModule } from './mapa-routing.module';


@NgModule({
  declarations: [MapaComponent, MapaPageComponent],
  imports: [CommonModule, GoogleMapsModule, MatIconModule, MapaRoutingModule],
})
export class MapaModule {}
