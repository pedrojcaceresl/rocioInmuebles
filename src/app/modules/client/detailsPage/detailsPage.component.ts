import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlidersComponent } from './components/sliders/sliders.component';
import { DetailsComponent } from './components/details/details.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    CommonModule,
    SlidersComponent,
    DetailsComponent
  ],
  template: `
    <div class="w-full px-20 flex my-20 h-full items-center">
      <div class="w-[873px]">
        <app-sliders />
      </div>
      <div class="w-1/3 lg:ml-10">
        <app-details />
      </div>
    </div>
  `,
  styleUrls: ['./detailsPage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent { }
