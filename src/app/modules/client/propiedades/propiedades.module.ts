import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropiedadesRoutingModule } from './propiedades-routing.module';
import { PropiedadesPageComponent } from './pages/propiedades-page/propiedades-page.component';
import { PropiedadesCardComponent } from './components/propiedades-card/propiedades-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PropiedadesCardSkeletonComponent } from './components/propiedades-card-skeleton/propiedades-card-skeleton.component';
import { MaterialModule } from '../../material/material.module';
import { PropertyCardClientComponent } from './components/property-card-client/property-card-client.component';
import { FilterComponent } from './components/filter/filter.component';
import { PropiedadesDetallesPageComponent } from './pages/propiedades-detalles-page/propiedades-detalles-page.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PropiedadesDescripcionComponent } from './components/propiedades-descripcion/propiedades-descripcion.component';
import { PropiedadesUbicacionComponent } from './components/propiedades-ubicacion/propiedades-ubicacion.component';
import { ConsultarCardDesktopComponent } from './components/consultar-card-desktop/consultar-card-desktop.component';
import { ConsultarCardMobileComponent } from './components/consultar-card-mobile/consultar-card-mobile.component';
import { PropertiesPageModule } from '../propertiesPage/propertiesPage.module';
import { PropertyFiltersComponent } from '../propertiesPage/components/propertyFilters/propertyFilters.component';
import { PropertyListComponent } from '../propertiesPage/components/propertyList/propertyList.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';


@NgModule({
  declarations: [
    PropiedadesPageComponent,
    PropiedadesCardComponent,
    PropiedadesCardSkeletonComponent,
    PropertyCardClientComponent,
    FilterComponent,
    PropiedadesDetallesPageComponent,
    GalleryComponent,
    PropiedadesDescripcionComponent,
    PropiedadesUbicacionComponent,
    ConsultarCardDesktopComponent,
    ConsultarCardMobileComponent,
  ],
  imports: [
    CommonModule,
    PropiedadesRoutingModule,
    SharedModule,
    MaterialModule,
    PropertiesPageModule,
    PropertyFiltersComponent,
    PropertyListComponent,
    FooterComponent
  ],
  exports:[
    PropiedadesCardComponent
  ]
})
export class PropiedadesClientModule { }
