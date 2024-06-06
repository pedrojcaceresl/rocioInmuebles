import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutModule } from './modules/client/about/about.module';

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
    path: 'about',
    loadChildren: () =>
      import('./modules/client/about/about.module').then(
        (m) => m.AboutModule
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
