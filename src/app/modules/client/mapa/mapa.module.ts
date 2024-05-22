import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './pages/mapa/mapa.component';
import { MapaRoutingModule } from './mapa-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapaPageComponent } from './pages/mapa/mapa-page/mapa-page.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';



@NgModule({
  declarations: [
    MapaComponent,
    MapaPageComponent
  ],
  imports: [
    CommonModule,
    MapaRoutingModule,
    SharedModule,
    GoogleMapsModule,
    MatIconModule,
    FooterComponent
  ]
})
export class MapaModule { }
