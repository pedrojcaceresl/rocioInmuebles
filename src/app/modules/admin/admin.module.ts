import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { AdminRoutingModule } from './admin-routing.module';
import { NuevaPropiedadPageComponent } from './pages/nueva-propiedad-page/nueva-propiedad-page.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [NuevaPropiedadPageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,

    GoogleMapsModule,

    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class AdminModule {}
