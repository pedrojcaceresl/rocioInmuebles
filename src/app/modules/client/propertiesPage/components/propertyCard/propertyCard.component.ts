import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ButtonBadgeComponent } from '../buttonBadge/buttonBadge.component';
import { formatCurrency } from 'src/app/core/helpers';



@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, ButtonBadgeComponent],
  template: `
    <div
      class="my-10 cursor-pointer hover:scale-105 rounded-2xl p-3 w-[306px] shadow-md h-[383px]"
      *ngIf="property"
    >
      <!-- image -->
      <div class="relative rounded-2xl max-w-[284px]">
        <div class="absolute top-5 left-3">
          <app-button-badge [transactionType]="property.transactionType" />
        </div>
        <img
          class="rounded-2xl w-full h-52 object-cover"
          [src]="property.imgUrl"
          alt=""
        />
      </div>

      <!-- price -->
      <div class="mt-2">
        <h1 class="text-green-500 font-bold text-xl">
          {{ formatCurrency(isForSale())
          }}<span class="text-xs font-normal">{{
            property.transactionType === TRANSACTION_TYPE.ALQUILER ? '/mes' : ''
          }}</span>
        </h1>
      </div>

      <!-- title section -->
      <div>
        <h1 class="font-bold text-xl text-gray-700">{{ property.title.slice(0,25) }}...</h1>
        <div class="mt-2 flex gap-x-2 items-center">
          <img
            class="h-[17px]"
            src="/assets/icons/location.png"
            alt="ubicacion"
          />
          <h1>{{ property.city }}</h1>
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

  formatCurrency = formatCurrency;

  TRANSACTION_TYPE = {
    ALQUILER: 'Alquiler',
    VENTA: 'Venta',
  };

  isForSale() {
    return this.property.transactionType === this.TRANSACTION_TYPE.ALQUILER
      ? this.property.priceMonth
      : this.property.priceSale;
  }

}
