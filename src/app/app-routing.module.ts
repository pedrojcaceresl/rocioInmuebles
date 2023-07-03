import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./linktree/linktree.module').then((m) => m.LinktreeModule),
  },
  {
    path: 'propiedades',
    loadChildren: () =>
      import('./propiedades/propiedades.module').then((m) => m.PropiedadesModule),
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
