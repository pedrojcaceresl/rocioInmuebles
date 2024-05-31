import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-yellow-400">
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
        <div class="my-4">
          <h1 class="text-xl font-bold text-[#181A20]">Eco Villa Penthouse</h1>
          <h4 class="font-normal text-[#717171]">178 Broadway, Brooklyn</h4>
        </div>

        <div class="feat-class flex">
          <div>
            <img src="/assets/icons/cama.png" alt="bed" />
            <h1 class="text-xl font-bold text-[#181A20]">Camas</h1>
          </div>
          <div>
            <img src="/assets/icons/cama.png" alt="bed" />
            <h1 class="text-xl font-bold text-[#181A20]">Camas</h1>
          </div>
          <div>
            <img src="/assets/icons/cama.png" alt="bed" />
            <h1 class="text-xl font-bold text-[#181A20]">Camas</h1>
          </div>
        </div>

        <div>
          <h2>Descripción</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis a eros quis pulvinar. Aenean ac urna eu orci commodo
            sollicitudin. Vestibulum vitae aliquet augue
          </p>
        </div>

        <div>
          <div>
            <h2>Contáctame</h2>
            <h3>+595 985 123 456</h3>
          </div>
          <div>
            <h2>Email</h2>
            <h3>agent@apus.com</h3>
          </div>
        </div>

        <div>
          <h1 class="text-xl font-bold text-[#181A20]">$180.000</h1>
        </div>

        <button class="bg-[#C0A700] w-[202px] flex px-10 justify-center py-1 rounded-sm items-center">
          <img src="/assets/icons/cama.png" alt="bed" />

          <h1 class="text-2xl font-bold text-white">Cotizar</h1>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  @Input() beds: number = 0;
  @Input() baths: number = 0;
  @Input() area: number = 0;
  @Input() description: string = '';
  @Input() contactNumber: string = '';
  @Input() email: string = '';
  @Input() price: number = 0;
}
