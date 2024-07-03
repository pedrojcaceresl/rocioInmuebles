import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-sliders',
  standalone: true,
  imports: [CommonModule, LightboxModule],
  template: `
    <div
      class="relative cursor-pointer min-h-96 h-[600px] rounded-lg bg-cover bg-center"
      (click)="open(currentIndex)"
      [ngStyle]="{ 'background-image': 'url(' + images[currentIndex] + ')' }"
    >
      <button (click)="prevSlide()" class="absolute top-1/2 left-2">
        <img src="/assets/icons/arrow-left.png" alt="" />
      </button>
      <button (click)="nextSlide()" class="absolute top-1/2 right-2">
        <img src="/assets/icons/arrow-right.png" alt="" />
      </button>

      <!-- indicators -->
    <div class="slider-container">
      <div
        class="relative min-h-96 h-[600px] rounded-lg bg-cover bg-center image-wrapper"
        [ngStyle]="{
          'background-image': 'url(' + images[currentIndex] + ')',
          opacity: currentOpacity
        }"
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
    </div>
  `,
  styleUrls: ['./sliders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidersComponent {
  currentIndex = 0;
  indicators: number[] = [];
  cd = inject(ChangeDetectorRef);
  _lightbox = inject(Lightbox);
  interval: any;

  private _album: any = [];
  currentOpacity = 1;
  interval: any;

  @Input() autoplay: Boolean = false;
  @Input() time: number = 2000; // 2000 by default
  @Input() images = [];

  ngOnInit() {
    this.indicators = Array(this.images.length).fill(0);
    if (this.autoplay) {
      this.goToNext(this.time);
    }

    for (let i = 0; i < this.images.length; i++) {
      const src = this.images[i];
      const caption = 'Imagen' + i;
      const thumb = this.images[i];
      const album = { src: src, caption: caption, thumb: thumb };
      this._album.push(album);
    }
  }

  open(index: number): void {
    this._lightbox.open(this._album, index, {
      alwaysShowNavOnTouchDevices: true,
      wrapAround: true,
    });
  }

  close(): void {
    this._lightbox.close();
  }

  nextSlide() {
    this.fadeOut(() => {
      const imgLength = this.images.length - 1;
      if (this.currentIndex < imgLength) {
        this.currentIndex++;
      } else if (this.currentIndex === imgLength) {
        this.currentIndex = 0;
      }
      this.fadeIn();
    });
  }

  goToNext(time: number) {
    this.interval = setInterval(() => {
      this.nextSlide();
      this.cd.markForCheck();
    }, time);
  }

  prevSlide() {
    this.fadeOut(() => {
      const imgLength = this.images.length - 1;
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else if (this.currentIndex === 0) {
        this.currentIndex = imgLength;
      }
      this.fadeIn();
    });
  }

  fadeOut(callback: () => void) {
    this.currentOpacity = 0.7;
    this.cd.markForCheck();
    setTimeout(() => {
      callback();
    }, 100); // Match this duration with your CSS transition
  }

  fadeIn() {
    setTimeout(() => {
      this.currentOpacity = 1;
      this.cd.markForCheck();
    }, 0); // Immediately start fading in after fading out
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
