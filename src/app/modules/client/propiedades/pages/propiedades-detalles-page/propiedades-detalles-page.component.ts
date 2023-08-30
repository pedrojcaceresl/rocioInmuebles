import { Component, Input, SimpleChanges } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carousel, Fancybox } from '@fancyapps/ui';






@Component({
  selector: 'app-propiedades-detalles-page',
  templateUrl: './propiedades-detalles-page.component.html',
  styleUrls: ['./propiedades-detalles-page.component.scss']
})
export class PropiedadesDetallesPageComponent {

  @Input() id: any;

  activatedRoute = inject(ActivatedRoute)

  carousel: any;


  ngAfterViewInit(): void {

    console.log(document.querySelector('#productCarousel'));


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
  //  { Thumbs }
 );


    Fancybox.bind('[data-fancybox="gallery"]',
    {
      idle: false,
      compact: false,
      dragToClose: false,

      animated: false,
      showClass: 'f-fadeSlowIn',
      hideClass: false,

      Carousel: {
        infinite: false,
      },

      Images: {
        zoom: false,
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
              axis: 'y',
            },
          },
        },
      },
    }
    );




    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = id;
    })
  }


  getProperty() {
    // Call the service to get the property by id

  }

}
