import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaModule } from './modules/client/mapa/mapa.module';

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
      import('./modules/client/propertiesPage/propertiesPage.module').then(
        (m) => m.PropertiesPageModule
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
