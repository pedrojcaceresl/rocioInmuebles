import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropiedadesPageComponent } from './pages/propiedades-page/propiedades-page.component';
import { PropiedadesDetallesPageComponent } from './pages/propiedades-detalles-page/propiedades-detalles-page.component';
import { PropertiesPageComponent } from '../propertiesPage/propertiesPage.component';

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
        component: PropiedadesDetallesPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadesRoutingModule { }
