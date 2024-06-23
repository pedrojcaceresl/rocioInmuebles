import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { PropertyListComponent } from './components/propertyList/propertyList.component';
import { PropertyFiltersComponent } from './components/propertyFilters/propertyFilters.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { SharedModule } from 'src/app/shared/shared.module';
@Component({
  selector: 'app-properties-page',
  standalone: true,
  imports: [
    CommonModule,
    PropertyListComponent,
    PropertyFiltersComponent,
    HttpClientModule,
    SharedModule,
  ],
  template: `
    <div class="flex flex-col xl:max-xl-[1920px] lg:max-w-7xl mx-auto">
      <div class="flex w-full" *ngIf="properties">
        <div class="hidden lg:block">
          <app-property-filters
            (onFiltered)="onFilteredItems($event)"
            [properties]="properties"
          />
        </div>
        <app-property-list [properties]="filteredItems" />
      </div>
    </div>
  `,
  styleUrls: ['./propertiesPage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesPageComponent {
  // injections
  cd = inject(ChangeDetectorRef);
  http = inject(HttpClient);
  firebaseService = inject(FirebaseService);

  // variables
  path: string = 'propiedades';
  isLoading = false;
  filteredItems: any[] = [];
  currentPage: number = 1; // Página actual
  ITEMS_PER_PAGE: number = 6; // Cantidad de elementos por página
  totalPages: any;
  properties: any[] = [];

  onFilteredItems(filtered: any) {
    // console.log('LA FILTRAMENTACION',filtered);
    if (filtered.length > 0) {
      this.filteredItems = filtered;
    } else {
      this.filteredItems = this.properties;
    }
  }

  ngOnInit() {
    this.firebaseService.getData(this.path).subscribe((res) => {
      this.filteredItems = res;
      this.properties = res;
      // console.log("🚀  LAS properties a ser enviadas:", this.properties)

      this.cd.markForCheck();
    });
  }
}
