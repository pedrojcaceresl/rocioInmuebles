import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaPropiedadPageComponent } from './pages/nueva-propiedad-page/nueva-propiedad-page.component';

const routes: Routes = [
  {
    path: '',
    component: NuevaPropiedadPageComponent
    // children: [
    //   {
    //     path: '',
    //     component: NuevaPropiedadPageComponent,
    //   },
    //   {
    //     path: '**',
    //     redirectTo: 'nueva-propiedad',
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevaPropiedadRoutingModule { }
