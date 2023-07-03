import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinktreePageComponent } from './pages/linktree/linktree-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'rocio',
        component: LinktreePageComponent
      },
      {
        path: '**',
        redirectTo: 'rocio'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinktreeRoutingModule { }
