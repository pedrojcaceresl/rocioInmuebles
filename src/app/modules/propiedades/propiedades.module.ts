import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { NuevaPropiedadPageComponent } from './pages/nueva-propiedad-page/nueva-propiedad-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PropiedadesRoutingModule } from './propiedades-routing.module';
import { MisPropiedadesComponent } from './pages/mis-propiedades/mis-propiedades.component';
import { PropiedadesClientModule } from "../client/propiedades/propiedades.module";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NuevaPropiedadPageComponent, MisPropiedadesComponent],
  imports: [
    CommonModule,
    PropiedadesRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    PropiedadesClientModule,
    SharedModule
  ],
})
export class PropiedadesModule {}
