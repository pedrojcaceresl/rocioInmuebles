import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropiedadesPageComponent } from './pages/propiedades-page/propiedades-page.component';
import { PropiedadesDetallesPageComponent } from './pages/propiedades-detalles-page/propiedades-detalles-page.component';

const routes: Routes = [
  {
    path: '',
    component: PropiedadesPageComponent,
  },
  {
    path: 'detalle/:id',
    component: PropiedadesDetallesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadesRoutingModule { }
