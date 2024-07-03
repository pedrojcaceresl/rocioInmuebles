import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './propertiesPage-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { PropertiesPageComponent } from './propertiesPage.component';
import { PropertyCardComponent } from './components/propertyCard/propertyCard.component';
import { PropertyListComponent } from './components/propertyList/propertyList.component';
import { PropertySearchComponent } from './components/propertySearch/propertySearch.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    SharedModule,
    MaterialModule,
    PropertiesPageComponent,
    PropertyCardComponent,
    PropertyListComponent,
    PropertySearchComponent
  ],
  exports:[
  ]
})
export class PropertiesPageModule { }
