import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { NuevaPropiedadRoutingModule } from './nueva-propiedad-routing.module';
import { NuevaPropiedadPageComponent } from './pages/nueva-propiedad-page/nueva-propiedad-page.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [NuevaPropiedadPageComponent],
  imports: [
    CommonModule,
    NuevaPropiedadRoutingModule,
    ReactiveFormsModule,

    GoogleMapsModule,

    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class NuevaPropiedadModule {}
