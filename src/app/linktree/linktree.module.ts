import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinktreePageComponent } from './pages/linktree/linktree-page.component';
import { LinktreeRoutingModule } from './linktree-routing.module';



@NgModule({
  declarations: [
    LinktreePageComponent,
  ],
  imports: [
    CommonModule,
    LinktreeRoutingModule
  ]
})
export class LinktreeModule { }
