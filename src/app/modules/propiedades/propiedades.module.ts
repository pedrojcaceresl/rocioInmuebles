import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevaPropiedadPageComponent } from './pages/nueva-propiedad-page/nueva-propiedad-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PropiedadesRoutingModule } from './propiedades-routing.module';
import { MisPropiedadesComponent } from './pages/mis-propiedades/mis-propiedades.component';
import { PropiedadesClientModule } from '../client/propiedades/propiedades.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

import { MaterialModule } from '../material/material.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';

@NgModule({
  declarations: [
    NuevaPropiedadPageComponent,
    MisPropiedadesComponent,
    ConfirmDialogComponent,
    SearchPageComponent,
  ],
  imports: [
    CommonModule,
    PropiedadesRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    PropiedadesClientModule,
    SharedModule,
    MaterialModule
  ],
})
export class PropiedadesModule {}
