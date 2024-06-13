import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { SlidersComponent } from './components/sliders/sliders.component';
import { DetailsComponent } from './components/details/details.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule, SlidersComponent, DetailsComponent],
  template: `
    <div
      class="w-full px-4 my-5 md:px-20 lg:flex lg:my-20 h-full justify-center"
    >
      <div class="lg:w-[873px]">
        <app-sliders
          [images]="propiedad.imgUrls"
          [autoplay]="true"
          [time]="4000"
        />
        <div class="lg:hidden my-10">
          <app-details
            [id]="id"
            [description]="propiedad.description"
            [title]="propiedad.title"
            [city]="propiedad.city"
            [baths]="propiedad.baths"
            [beds]="propiedad.beds"
            [dimension]="propiedad.dimension"
            [priceSale]="propiedad.priceSale"
          />
        </div>
      </div>
      <div class="w-1/3 lg:ml-10 hidden lg:flex  mt-10">
        <app-details
          [id]="id"
          [description]="propiedad.description"
          [title]="propiedad.title"
          [city]="propiedad.city"
          [baths]="propiedad.baths"
          [beds]="propiedad.beds"
          [dimension]="propiedad.dimension"
          [priceSale]="propiedad.priceSale"
        />
      </div>
    </div>
  `,
  styleUrls: ['./detailsPage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
  private route = inject(ActivatedRoute);
  private propertyService = inject(FirebaseService);
  private path = 'propiedades'; //path en donde esta la info en firebase
  id = '';
  propiedad: any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getPropertyById(this.id);
    });
  }

  getPropertyById(id: string) {
    this.propertyService.getDataById(id, this.path).subscribe((res) => {
      console.log(res);
      this.propiedad = res;
    });
  }
}
