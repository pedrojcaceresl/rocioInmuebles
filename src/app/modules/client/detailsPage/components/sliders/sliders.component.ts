import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-sliders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative min-h-96 h-[600px] bg-cover bg-center"
      [ngStyle]="{'background-image': 'url(' + images[currentIndex].url + ')'}"
    >
      <button (click)="prevSlide()" class="absolute top-1/2 left-2">
        <img src="/assets/icons/arrow-left.png" alt="" />
      </button>
      <button (click)="nextSlide()" class="absolute top-1/2 right-2">
        <img src="/assets/icons/arrow-right.png" alt="" />
      </button>

      <!-- indicators -->
      <div
        class="z-30 flex space-x-3 rtl:space-x-reverse absolute bottom-4 w-full justify-center"
      >
        <button
          type="button"
          *ngFor="let item of indicators; let i = index"
          class="w-3 h-3 rounded-full"
          [ngClass]="{
            'bg-white': i === currentIndex,
            'border-2 border-solid border-white': i !== currentIndex
          }"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
      </div>
    </div>
  `,
  styleUrls: ['./sliders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidersComponent {
  currentIndex = 0;
  indicators: number[] = [];

  @Input() images = [
    {
      url: 'https://v2b.com.mx/wp-content/uploads/2020/09/20200226_180902-scaled.jpg',
      alt: 'casa residencial 1',
    },
    {
      url: 'https://assets.easybroker.com/property_images/2521852/39381760/EB-IR1852.jpeg?version=1633924491',
      alt: 'casa residencial 1',
    },
    {
      url: 'https://v2b.com.mx/wp-content/uploads/2020/09/20200226_180902-scaled.jpg',
      alt: 'casa residencial 1',
    },
    {
      url: 'https://assets.easybroker.com/property_images/2521852/39381760/EB-IR1852.jpeg?version=1633924491',
      alt: 'casa residencial 1',
    },
    {
      url: 'https://v2b.com.mx/wp-content/uploads/2020/09/20200226_180902-scaled.jpg',
      alt: 'casa residencial 1',
    },
    {
      url: 'https://assets.easybroker.com/property_images/2521852/39381760/EB-IR1852.jpeg?version=1633924491',
      alt: 'casa residencial 1',
    },
  ];

  ngOnInit() {
    this.indicators = Array(this.images.length).fill(0);
    console.log(this.indicators);
  }

  nextSlide() {
    const imgLength = this.images.length - 1;
    if (this.currentIndex < imgLength) {
      this.currentIndex++;
    } else if (this.currentIndex === imgLength) {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    const imgLength = this.images.length - 1;
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.currentIndex === 0) {
      this.currentIndex = imgLength;
    }
  }
}
