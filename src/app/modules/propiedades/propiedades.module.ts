import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropiedadesRoutingModule } from './propiedades-routing.module';
import { PropiedadesPageComponent } from './pages/propiedades-page/propiedades-page.component';
import { PropiedadesCardComponent } from './components/propiedades-card/propiedades-card.component';


@NgModule({
  declarations: [
    PropiedadesPageComponent,
    PropiedadesCardComponent
  ],
  imports: [
    CommonModule,
    PropiedadesRoutingModule
  ]
})
export class PropiedadesModule { }
