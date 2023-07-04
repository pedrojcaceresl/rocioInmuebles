import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./linktree/linktree.module').then((m) => m.LinktreeModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'propiedades',
    loadChildren: () =>
      import('./propiedades/propiedades.module').then(
        (m) => m.PropiedadesModule
      ),
  },
  {
    path: 'layout',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
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
