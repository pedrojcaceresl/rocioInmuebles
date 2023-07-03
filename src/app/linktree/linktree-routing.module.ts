import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinktreePageComponent } from './pages/linktree/linktree-page.component';

const routes: Routes = [
  {
    path: '',
    component: LinktreePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinktreeRoutingModule { }
