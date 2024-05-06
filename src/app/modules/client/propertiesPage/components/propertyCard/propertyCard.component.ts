import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ButtonBadgeComponent } from '../buttonBadge/buttonBadge.component';



@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, ButtonBadgeComponent],
  template: `
    <div class="m-10 rounded-2xl p-3 max-w-[328px] shadow-md" *ngIf="property">
      <!-- image -->
      <div class="relative rounded-2xl max-w-[306px]">
        <div class="absolute top-5 left-3">
          <app-button-badge />
        </div>
        <img class="rounded-2xl " [src]="property.imgUrl" alt="" />
      </div>

      <!-- price -->
      <div class="mt-2">
        <h1 class="text-green-500 font-bold text-xl">
          \${{ property.priceMonth
          }}<span class="text-xs font-normal">/mes</span>
        </h1>
      </div>

      <!-- title section -->
      <div>
        <h1 class="font-bold text-xl text-gray-700">{{ property.title }}</h1>
        <div class="mt-2 flex gap-x-2 items-center">
          <img
            class="h-[17px]"
            src="/assets/icons/location.png"
            alt="ubicacion"
          />
          <h1>{{ property.ubicacion }}</h1>
        </div>
      </div>

      <!-- Feat section -->
      <div class="flex gap-x-4 mt-3">
        <div class="flex items-center">
          <img class="h-3" src="/assets/icons/cama.png" alt="" />
          <span class="mx-2">{{ property.beds }}</span>
        </div>
        <div class="flex items-center">
          <img class="h-3" src="/assets/icons/banho.png" alt="" />
          <span class="mx-2">{{ property.baths }}</span>
        </div>
        <div class="flex items-center">
          <img class="h-3" src="/assets/icons/meters.png" alt="" />
          <span class="mx-2">{{ property.dimension }}</span>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./propertyCard.component.css'],
})
export class PropertyCardComponent {
  @Input() property: any;

}
