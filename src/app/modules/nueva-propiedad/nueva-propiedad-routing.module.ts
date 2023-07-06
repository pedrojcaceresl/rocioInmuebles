import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaPropiedadPageComponent } from './pages/nueva-propiedad-page/nueva-propiedad-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'nueva-propiedad',
        component: NuevaPropiedadPageComponent,
      },
      {
        path: '**',
        redirectTo: 'nueva-propiedad',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevaPropiedadRoutingModule { }
