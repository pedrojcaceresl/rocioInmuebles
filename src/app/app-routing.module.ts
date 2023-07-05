import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/linktree/linktree.module').then(
        (m) => m.LinktreeModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'propiedades',
    loadChildren: () =>
      import('./modules/propiedades/propiedades.module').then(
        (m) => m.PropiedadesModule
      ),
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
