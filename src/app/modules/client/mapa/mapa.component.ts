import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapaPageComponent } from './pages/mapa-page/mapa-page.component';
import { MapaRoutingModule } from './mapa-routing.module';

@Component({
  selector: 'app-mapa',
  template: `
    <div class="flex items-center w-1/2 mx-auto my-5">
      <app-mapa-page class="items-center p-5 mx-auto" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapaComponent {}
