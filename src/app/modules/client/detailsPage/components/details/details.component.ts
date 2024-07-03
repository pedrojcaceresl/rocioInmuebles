import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="space-x-5">
        <button
          *ngIf="isOffer"
          class="uppercase bg-[#C0A700] text-sm text-white font-bold px-6 py-2 rounded-lg"
        >
          Oferta
        </button>
        <button
          class="uppercase bg-[#0D1C39] text-sm text-white font-bold px-6 py-2 rounded-lg"
        >
          {{ transactionType || 'En venta' }}
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
          <p
            [innerHTML]="
              showMore ? description.slice(0, 140) + '...' : description
            "
          ></p>
          <span
            (click)="toggleShow()"
            class="font-bold cursor-pointer text-slate-700"
          >
            {{ showMore ? 'Ver más' : 'Ver menos' }}
          </span>
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
            {{ priceSale | currency: 'USD' }}
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
  @Input() id: string = ''
  @Input() title: string = 'Eco Villa Penthouse'
  @Input() city: string = '178 Broadway, Brooklyn'
  @Input() beds: number = 0
  @Input() baths: number = 0
  @Input() isOffer: boolean = true
  @Input() dimension: number = 0
  @Input() description: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam hic repudiandae magnam cum mollitia aliquam eos totam doloribus magni. Repudiandae aperiam officia minima ullam aut? Illo tempore sint doloribus commodi.';
  @Input() transactionType: string = '';
  @Input() contactNumber: string = '+595 994 329 377';
  @Input() email: string = 'contacto.rocioinmuebles@gmail.com';
  @Input() priceSale: number = 180000;

  descripcionHtml: string = `   <h1>Inversión en Complejo de Edificio 🏢✨</h1>
    <h2>Características del Complejo</h2>
    <p>Descubre una oportunidad única de inversión en un complejo de edificio con áreas comunes y servicios de primer nivel:</p>

    <h3>Áreas Comunes:</h3>
    <ul>
        <li>🏊 Piscina</li>
        <li>🍖 Parrillas</li>
        <li>🌞 Solarium</li>
        <li>🚻 Baños Sexados</li>
        <li>🧺 Lavadero</li>
        <li>🛗 Ascensores</li>
        <li>💪 Gym Exterior</li>
        <li>🎠 Juegos para Niños</li>
        <li>💼 Coworking</li>
        <li>🚗 Cocheras</li>
    </ul>

    <h2>Tipologías de Departamentos</h2>
    <p>El complejo cuenta con 98 departamentos distribuidos en 7 niveles:</p>
    <ul>
        <li>Monoambiente (28m²): Compacto y funcional, ideal para una persona o pareja.</li>
        <li>1 Habitación Junior (32m²): Perfecto para quienes buscan un poco más de espacio.</li>
        <li>1 Habitación Plus (43m²): Mayor comodidad y espacio para una vida más confortable.</li>
    </ul>

    <h2>Distribución de Plantas</h2>
    <p>Cada planta tipo está diseñada para optimizar el espacio y la funcionalidad:</p>
    <ul>
        <li>DPTO 01: 1 Habitación Junior (32m²)</li>
        <li>DPTO 02, 07: 1 Habitación Plus (43m²)</li>
        <li>DPTO 03, 04, 05, 06, 08: Monoambiente (28m²)</li>
    </ul>

    <h2>Áreas de Esparcimiento</h2>
    <ul>
        <li>Solarium y Piscina: Espacios diseñados para el descanso y la recreación.</li>
        <li>Quincho Climatizado: Perfecto para reuniones sociales en cualquier época del año.</li>
        <li>Área de Ejercicios y Juegos para Niños: Ideal para mantener un estilo de vida activo y saludable.</li>
    </ul>

    <h2>Equipamiento Moderno y Servicios 24hs</h2>
    <ul>
        <li>🍳 Kitchenettes equipadas con horno y anafe</li>
        <li>🚪 Placares</li>
        <li>❄️ Heladera</li>
        <li>🛏️ Cama</li>
        <li>🚿 Baño 100% equipado</li>
        <li>🛡️ Lobby con seguridad 24 hs.</li>
        <li>🏋️ Sala de ejercicios 24 hs.</li>
        <li>📚 Salas de estudio y coworking 24 hs.</li>
        <li>🧺 Lavandería pay-per-use</li>
        <li>🔥 3 parrilleros en azotea</li>
        <li>📶 WiFi de alta fidelidad en todo el edificio</li>
        <li>🚴 Estacionamientos para bicicletas</li>
        <li>🧘 Yoga & relax room</li>
        <li>🚗 Lugar preferencial para Uber y Bolt</li>
        <li>🎥 CCTV en todos los pasillos y áreas comunes</li>
        <li>🔑 Controles electrónicos de acceso a todas las áreas</li>
        <li>☕ Cafetería integrada al edificio</li>
        <li>🌐 Comunidad Lofty</li>
        <li>🚙 Cocheras para 15 vehículos</li>
    </ul>

    <p>¡Invertí en un proyecto de alta calidad y excelente ubicación! 🏡📈</p>`

  showMore: Boolean = true

  toggleShow() {
    this.showMore = !this.showMore
  }

  getWhatsAppLink(title: string): string {
    const phoneNumber = '595973205207'
    const url = `https://rocioinmuebles.com/propiedades/detalle/${this.id}`
    const message = `Estoy interesado en la propiedad: ${title}. La url aquí: ${url}`
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }
}
