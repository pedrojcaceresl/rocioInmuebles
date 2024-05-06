import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './pages/mapa/mapa.component';

const routes: Routes = [
  {
    path: '',
    component: MapaComponent,
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaRoutingModule {}
