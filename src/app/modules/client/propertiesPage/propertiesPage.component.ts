import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { PropertyListComponent } from './components/propertyList/propertyList.component';
import { PropertyFiltersComponent } from './components/propertyFilters/propertyFilters.component';
import { PropertySearchComponent } from './components/propertySearch/propertySearch.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MobileFilterService } from './components/mobileFilter/mobileFilter.service';
import { MobileFilterComponent } from "./components/mobileFilter/mobileFilter.component";
@Component({
  selector: 'app-properties-page',
  standalone: true,
  template: `
    <div
      class="flex flex-col items-center xl:max-xl-[1920px] lg:max-w-7xl mx-auto"
    >
      <div class=" w-[306px] md:w-full flex justify-end mb-4 px-4">
        <button
          (click)="toggleSidebar()"
          class="max-w-40 bg-amarillo-rocio left-52  text-white rounded-lg py-2 px-6 font-bold lg:hidden "
        >
          Filtros
        </button>
      </div>
      <div class="flex w-full" *ngIf="properties">
        <div class="hidden lg:block">
          <app-property-search
            [properties]="properties"
            (filteredProperties)="onSearch($event)"
          ></app-property-search>
          <app-property-filters
            (onFiltered)="onFilteredItems($event)"
            [properties]="properties"
          />
        </div>
        <app-property-list [properties]="filteredItems" />
      </div>
    </div>

    <app-mobile-filter class="sm:hidden">
      <app-property-filters
        (onFiltered)="onFilteredItems($event)"
        [properties]="properties"
      />
    </app-mobile-filter>
  `,
  styleUrls: ['./propertiesPage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PropertyListComponent,
    PropertyFiltersComponent,
    HttpClientModule,
    SharedModule,
    PropertySearchComponent,
    MobileFilterComponent,
  ],
})
export class PropertiesPageComponent {
  // injections
  cd = inject(ChangeDetectorRef);
  http = inject(HttpClient);
  mobileFilterService = inject(MobileFilterService);
  firebaseService = inject(FirebaseService);

  // variables
  path: string = 'propiedades';
  isLoading = false;
  filteredItems: any[] = [];
  currentPage: number = 1; // Página actual
  ITEMS_PER_PAGE: number = 6; // Cantidad de elementos por página
  totalPages: any;
  properties: any[] = [];

  filteredProperties = [...this.properties]; // Inicialmente todas las propiedades

  onFilteredItems(filter: any) {
    this.filteredItems = this.properties.filter((property) => {
      const matchesPrice =
        (!filter.priceRange.min && !filter.priceRange.max) ||
        (property.priceSale >= filter.priceRange.min &&
          property.priceSale <= filter.priceRange.max);
      const matchesCategory =
        filter.categories.length === 0 ||
        filter.categories.includes(property.transactionType);
      const matchesLocation =
        filter.locations.length === 0 ||
        filter.locations.includes(property.state);
      const matchesType =
        filter.types.length === 0 || filter.types.includes(property.type);

      return matchesPrice && matchesCategory && matchesLocation && matchesType;
    });
    this.cd.markForCheck();
  }

  onSearch(filtered: any) {
    if (filtered.length > 0) {
      this.filteredItems = filtered;
    } else {
      this.filteredItems = this.properties;
    }
  }

  toggleSidebar() {
    this.mobileFilterService.toggle();
  }

  ngOnInit() {
    this.firebaseService.getData(this.path).subscribe((res) => {
      this.filteredItems = res;
      this.properties = res;
      this.cd.markForCheck();
    });
  }
}
