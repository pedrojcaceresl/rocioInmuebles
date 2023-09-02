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
      'data-thumb-src':
        'https://www.ecovillas.com.py/br/assets/images/implantacao.fw-1-3806x2141.png',
      'data-src':
        'https://www.ecovillas.com.py/br/assets/images/implantacao.fw-1-3806x2141.png',
    },
    {
      'data-thumb-src':
        'https://www.ecovillas.com.py/br/assets/images/piscina-academia-003-2000x1125.jpg',
      'data-src':
        'https://www.ecovillas.com.py/br/assets/images/piscina-academia-003-2000x1125.jpg',
    },
    {
      'data-thumb-src':
        'https://www.ecovillas.com.py/br/assets/images/portaria-02-2000x1125.jpg',
      'data-src':
        'https://www.ecovillas.com.py/br/assets/images/portaria-02-2000x1125.jpg',
    },
    {
      'data-thumb-src':
        'https://www.ecovillas.com.py/br/assets/images/blocos-residenciais-01-2000x1125.jpg',
      'data-src':
        'https://www.ecovillas.com.py/br/assets/images/blocos-residenciais-01-2000x1125.jpg',
    },
    {
      'data-thumb-src':
        'https://www.ecovillas.com.py/br/assets/images/playground-2000x1125.jpg',
      'data-src':
        'https://www.ecovillas.com.py/br/assets/images/playground-2000x1125.jpg',
    },
    {
      'data-thumb-src': 'https://www.ecovillas.com.py/br/assets/images/blocos-residenciais-02-2000x1125.jpg',
      'data-src': 'https://www.ecovillas.com.py/br/assets/images/blocos-residenciais-02-2000x1125.jpg',
    },
    {
      'data-thumb-src': 'https://www.ecovillas.com.py/br/assets/images/02-2000x1125-800x450.jpg',
      'data-src': 'https://www.ecovillas.com.py/br/assets/images/02-2000x1125-800x450.jpg',
    },
    {
      'data-thumb-src': 'https://www.ecovillas.com.py/br/assets/images/piscina-academia-002-2000x1125.jpg',
      'data-src': 'https://www.ecovillas.com.py/br/assets/images/piscina-academia-002-2000x1125.jpg',
    },
    {
      'data-thumb-src': 'https://www.ecovillas.com.py/br/assets/images/implantao-001-2000x1125.jpg',
      'data-src': 'https://www.ecovillas.com.py/br/assets/images/implantao-001-2000x1125.jpg',
    },
  ];

  ngAfterViewInit(): void {
    new Carousel(
      document.getElementById('productCarousel'),
      {
        infinite: true,
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
