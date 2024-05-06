import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject } from '@angular/core';
import { PropertyListComponent } from './components/propertyList/propertyList.component';
import { PropertyFiltersComponent } from './components/propertyFilters/propertyFilters.component';
@Component({
  selector: 'app-properties-page',
  standalone: true,
  imports: [CommonModule, PropertyListComponent, PropertyFiltersComponent],
  template: `
    <div class="flex xl:max-xl-[1920px] lg:max-w-7xl mx-auto">
      <app-property-filters
        (onFiltered)="onFilteredItems($event)"
        [properties]="properties"
      />
      <app-property-list [properties]="filteredItems" />
    </div>
  `,
  styleUrls: ['./propertiesPage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesPageComponent {
  cd = inject(ChangeDetectorRef);
  properties = [
    {
      imgUrl:
        'https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2Fqf55hfmz1g194vekc5j4v6ema5i215&option=N&h=472&permitphotoenlargement=false',
      oferta: true,
      categoria: 'alquiler',
      tipo: 'departamento',
      priceMonth: 2500,
      priceSale: 0,
      title: 'Eco Villa Penthouse',
      beds: 4,
      baths: 2,
      dimension: 400,
      ubicacion: 'Ciudad del Este',
      locationCoords: '',
    },
    {
      imgUrl:
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/464841037.jpg?k=f70c1524982939e7f7e175e375563708aae0a7976f32858afb6779b12793288c&o=&hp=1',
      oferta: true,
      categoria: 'alquiler',
      tipo: 'departamento',
      priceMonth: 2500,
      priceSale: 0,
      title: 'Departamento',
      beds: 4,
      baths: 2,
      dimension: 400,
      ubicacion: 'Ciudad del Este',
      locationCoords: '',
    },
    {
      imgUrl:
        'https://img.jamesedition.com/listing_images/2023/10/24/15/50/34/503a8f37-d76f-4979-b045-7cbd7fe4e2b7/je/1100xxs.jpg',
      oferta: false,
      categoria: 'venta',
      tipo: 'casa',
      priceMonth: 0,
      priceSale: 150000,
      title: 'Casa en Asunción',
      beds: 3,
      baths: 2,
      dimension: 300,
      ubicacion: 'Asunción',
      locationCoords: '',
    },
    {
      imgUrl:
        'https://cdn2.infocasas.com.uy/repo/img/511ccba88a59c40caf971656e5351dc4c8387836.jpg',
      oferta: true,
      categoria: 'alquiler',
      tipo: 'departamento',
      priceMonth: 1800,
      priceSale: 0,
      title: 'Departamento Amoblado',
      beds: 2,
      baths: 1,
      dimension: 200,
      ubicacion: 'Encarnación',
      locationCoords: '',
    },
    // Agrega más propiedades aquí con diferentes ubicaciones en Paraguay
  ];

  filteredItems = this.properties;

  ngOnInit() {
    console.log('init');
  }

  onFilteredItems(filtered: any) {
    console.log({ filtered });
    if (filtered.length > 0) {
      this.filteredItems = filtered;
    } else {
      this.filteredItems = this.properties;
    }
  }
}
