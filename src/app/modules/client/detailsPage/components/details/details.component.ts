import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="space-x-5">
        <button
          class="uppercase bg-[#C0A700] text-sm text-white font-bold px-6 py-2 rounded-lg"
        >
          Oferta
        </button>
        <button
          class="uppercase bg-[#0D1C39] text-sm text-white font-bold px-6 py-2 rounded-lg"
        >
          En venta
        </button>
      </div>

      <div>
        <div class="mt-6">
          <h1 class="text-xl font-bold text-[#181A20]">{{ title }}</h1>
          <h4 class="font-normal text-[#717171]">{{ city }}</h4>
        </div>

        <div class="feat-class flex space-x-8 mt-6">
          <div *ngIf="baths" class="flex space-x-2 items-center">
            <img src="/assets/icons/cama.png" alt="bed" class="h-[13px]" />
            <h1 class="text-md font-bold text-[#181A20]">
              {{ beds }} Dormitorios
            </h1>
          </div>
          <div *ngIf="baths" class="flex space-x-2 items-center">
            <img src="/assets/icons/banho.png" alt="bed" class="h-[13px]" />
            <h1 class="text-md font-bold text-[#181A20]">{{ baths }} Baños</h1>
          </div>
          <div *ngIf="dimension" class="flex space-x-2 items-center">
            <img src="/assets/icons/meters.png" alt="bed" class="h-[13px]" />
            <h1 class="text-md font-bold text-[#181A20]">{{ dimension }} m2</h1>
          </div>
        </div>

        <div class="mt-6">
          <h2 class="text-lg font-bold">Descripción</h2>
          <p>
            {{ showMore ? description.slice(0, 140) + '...' : description }}
            <span
              (click)="toggleShow()"
              class="font-bold cursor-pointer text-slate-700"
              >{{ showMore ? 'Ver más' : 'Ver menos' }}</span
            >
          </p>
        </div>

        <div class="flex mt-6 space-x-6">
          <div>
            <h2 class="font-bold">Contáctame</h2>
            <h3>{{ contactNumber }}</h3>
          </div>
          <div>
            <h2 class="font-bold">Email</h2>
            <h3>{{ email }}</h3>
          </div>
        </div>

        <div class="mt-6">
          <h1 class="text-xl font-bold text-[#181A20]">
            {{ priceSale | currency : 'USD' }}
          </h1>
        </div>

        <button
          class="bg-[#C0A700] mt-6 w-[202px] rounded-lg flex px-10 justify-center py-1 items-center space-x-2"
        >
          <img src="/assets/svg/whatsapp.svg" alt="whatsapp" class="h-6" />

          <a [href]="getWhatsAppLink(title)" target="_blank">
            <h1 class="text-2xl font-bold text-white">Cotizar</h1>
          </a>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  @Input() id: string = '';
  @Input() title: string = 'Eco Villa Penthouse';
  @Input() city: string = '178 Broadway, Brooklyn';
  @Input() beds: number = 0;
  @Input() baths: number = 0;
  @Input() dimension: number = 0;
  @Input() description: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam hic repudiandae magnam cum mollitia aliquam eos totam doloribus magni. Repudiandae aperiam officia minima ullam aut? Illo tempore sint doloribus commodi.';
  @Input() contactNumber: string = '+595 994 329 377';
  @Input() email: string = 'contacto.rocioinmuebles@gmail.com';
  @Input() priceSale: number = 180000;

  showMore: Boolean = true;

  toggleShow() {
    this.showMore = !this.showMore;
  }

  getWhatsAppLink(title: string): string {
    const phoneNumber = '595994329377';
    const url = `https://www.rocioinmuebles.com/propiedades/detalle/${this.id}`;
    const message = `Estoy interesado en la propiedad: ${title}. La url aquí: ${url}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}
