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
          <h4 class="font-normal text-[#717171]">{{ address }}</h4>
        </div>

        <div class="feat-class flex space-x-8 mt-6">
          <div class="flex space-x-2 items-center">
            <img src="/assets/icons/cama.png" alt="bed" class="h-[13px]" />
            <h1 class="text-lg font-bold text-[#181A20]">4 Dormitorios</h1>
          </div>
          <div class="flex space-x-2 items-center">
            <img src="/assets/icons/banho.png" alt="bed" class="h-[13px]" />
            <h1 class="text-lg font-bold text-[#181A20]">2 Baños</h1>
          </div>
          <div class="flex space-x-2 items-center">
            <img src="/assets/icons/meters.png" alt="bed" class="h-[13px]" />
            <h1 class="text-lg font-bold text-[#181A20]">200 m2</h1>
          </div>
        </div>

        <div class="mt-6">
          <h2 class="text-lg">Descripción</h2>
          <p>
            {{ description }}
          </p>
        </div>

        <div class="flex mt-6 space-x-6">
          <div>
            <h2>Contáctame</h2>
            <h3>{{ contactNumber }}</h3>
          </div>
          <div>
            <h2>Email</h2>
            <h3>{{ email }}</h3>
          </div>
        </div>

        <div class="mt-6">
          <h1 class="text-xl font-bold text-[#181A20]">$ {{ price }}</h1>
        </div>

        <button
          class="bg-[#C0A700] mt-6 w-[202px] rounded-lg flex px-10 justify-center py-1 items-center space-x-2"
        >
          <img src="/assets/svg/whatsapp.svg" alt="whatsapp" class="h-6" />

          <h1 class="text-2xl font-bold text-white">Cotizar</h1>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  @Input() title: string = 'Eco Villa Penthouse';
  @Input() address: string = '178 Broadway, Brooklyn';
  @Input() beds: number = 0;
  @Input() baths: number = 0;
  @Input() area: number = 0;
  @Input() description: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam hic repudiandae magnam cum mollitia aliquam eos totam doloribus magni. Repudiandae aperiam officia minima ullam aut? Illo tempore sint doloribus commodi.';
  @Input() contactNumber: string = '+595 985 123 456';
  @Input() email: string = 'example@mail.com';
  @Input() price: number = 180000;
}
