import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropiedadesPageComponent } from './pages/propiedades-page/propiedades-page.component';
import { PropertiesPageComponent } from '../propertiesPage/propertiesPage.component';
import { DetailsPageComponent } from '../detailsPage/detailsPage.component';

const routes: Routes = [
  {
    path: '',
    component: PropiedadesPageComponent,
    children: [
      {
        path: '',
        component: PropertiesPageComponent,
      },
      {
        path: 'detalle/:id',
        component: DetailsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadesRoutingModule { }
