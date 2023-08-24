import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaPropiedadPageComponent } from './pages/nueva-propiedad-page/nueva-propiedad-page.component';
import { MisPropiedadesComponent } from './pages/mis-propiedades/mis-propiedades.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mis-propiedades',
        component: MisPropiedadesComponent
      },
      {
        path: 'nueva-propiedad',
        component: NuevaPropiedadPageComponent
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'edit/:id',
        component: NuevaPropiedadPageComponent,
      },
      {
        path: 'mis-propiedades',
        component: MisPropiedadesComponent,
      },
      // TODO: Crear componente de detalle de propiedad
      // {
      //   path: ':id',
      //   component: HeroPageComponent,
      // },
      {
        path: '**',
        redirectTo: 'mis-propiedades'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadesRoutingModule { }
