import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/client/linktree/linktree.module').then(
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
      import('./modules/client/propiedades/propiedades.module').then(
        (m) => m.PropiedadesClientModule
      ),
  },
  {
    path: 'mapa',
    loadChildren: () =>
      import('./modules/client/mapa/mapa.module').then(
        (m) => m.MapaModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(
        (m) => m.AuthModule
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
