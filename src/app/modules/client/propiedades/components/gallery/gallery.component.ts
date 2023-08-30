import { Component } from '@angular/core';
import { Fancybox } from '@fancyapps/ui';

import { Carousel } from '@fancyapps/ui';

import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  constructor() {}

  images = [
    {
      'data-thumb-src': 'https://fancyapps.com/img/car_1_s.jpg',
      'data-src': 'https://fancyapps.com/img/car_1_b.jpg',
    },
    {
      'data-thumb-src': 'https://fancyapps.com/img/car_2_s.jpg',
      'data-src': 'https://fancyapps.com/img/car_2_b.jpg',
    },
    {
      'data-thumb-src': 'https://fancyapps.com/img/car_3_s.jpg',
      'data-src': 'https://fancyapps.com/img/car_3_b.jpg',
    },
    {
      'data-thumb-src': 'https://fancyapps.com/img/car_4_s.jpg',
      'data-src': 'https://fancyapps.com/img/car_4_b.jpg',
    },
    {
      'data-thumb-src': 'https://fancyapps.com/img/car_5_s.jpg',
      'data-src': 'https://fancyapps.com/img/car_5_b.jpg',
    },
    {
      'data-thumb-src': 'https://fancyapps.com/img/car_6_s.jpg',
      'data-src': 'https://fancyapps.com/img/car_6_b.jpg',
    },
    {
      'data-thumb-src': 'https://fancyapps.com/img/car_7_s.jpg',
      'data-src': 'https://fancyapps.com/img/car_7_b.jpg',
    },
    {
      'data-thumb-src': 'https://fancyapps.com/img/car_8_s.jpg',
      'data-src': 'https://fancyapps.com/img/car_8_b.jpg',
    },
    {
      'data-thumb-src': 'https://fancyapps.com/img/car_9_s.jpg',
      'data-src': 'https://fancyapps.com/img/car_9_b.jpg',
    },
  ];

  ngAfterViewInit(): void {
    new Carousel(
      document.getElementById('productCarousel'),
      {
        infinite: false,
        Dots: false,
        Thumbs: {
          type: 'classic',
          Carousel: {
            slidesPerPage: 1,
            Navigation: true,
            center: true,
            fill: true,
            dragFree: true,
          },
        },
      },
      { Thumbs }
    );

    Fancybox.bind('[data-fancybox="gallery"]', {
      idle: false,
      compact: false,
      dragToClose: true,

      animated: true,
      showClass: 'f-fadeSlowIn',
      hideClass: false,

      Carousel: {
        infinite: false,
      },

      Images: {
        zoom: true,
        Panzoom: {
          maxScale: 1.5,
        },
      },

      Toolbar: {
        absolute: true,
        display: {
          left: [],
          middle: [],
          right: ['close'],
        },
      },

      Thumbs: {
        type: 'classic',
        Carousel: {
          axis: 'x',

          slidesPerPage: 1,
          Navigation: true,
          center: true,
          fill: true,
          dragFree: true,

          breakpoints: {
            '(min-width: 640px)': {
              axis: 'x',
            },
          },
        },
      },
    });
  }
}
