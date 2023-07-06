import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropiedadesRoutingModule } from './propiedades-routing.module';
import { PropiedadesPageComponent } from './pages/propiedades-page/propiedades-page.component';
import { PropiedadesCardComponent } from './components/propiedades-card/propiedades-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PropiedadesPageComponent,
    PropiedadesCardComponent
  ],
  imports: [
    CommonModule,
    PropiedadesRoutingModule,
    SharedModule
  ],
  exports:[
    PropiedadesCardComponent
  ]
})
export class PropiedadesClientModule { }
