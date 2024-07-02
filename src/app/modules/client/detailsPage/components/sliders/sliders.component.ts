import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';

@Component({
  selector: 'app-sliders',
  standalone: true,
  imports: [CommonModule],
  template: `
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

  currentOpacity = 1;
  interval: any;

  @Input() autoplay: Boolean = false;
  @Input() time: number = 2000; // 2000 by default

  @Input() images = [];

  ngOnInit() {
    this.indicators = Array(this.images.length).fill(0);
    console.log(this.indicators);
    if (this.autoplay) {
      this.goToNext(this.time);
    }
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
