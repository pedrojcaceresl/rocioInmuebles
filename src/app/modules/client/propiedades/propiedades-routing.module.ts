import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropiedadesPageComponent } from './pages/propiedades-page/propiedades-page.component';

const routes: Routes = [
  {
    path: '',
    component: PropiedadesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadesRoutingModule { }
