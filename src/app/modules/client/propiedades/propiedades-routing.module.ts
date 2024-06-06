import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropiedadesPageComponent } from './pages/propiedades-page/propiedades-page.component';
import { PropertiesPageComponent } from '../propertiesPage/propertiesPage.component';
import { DetailsPageComponent } from '../detailsPage/detailsPage.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { MapaComponent } from '../mapa/mapa.component';

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
      {
        path: 'about',
        component: AboutPageComponent,
      },
      {
        path: 'mapa', 
        loadChildren: () => import('../mapa/mapa.module').then(m => m.MapaModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadesRoutingModule { }
