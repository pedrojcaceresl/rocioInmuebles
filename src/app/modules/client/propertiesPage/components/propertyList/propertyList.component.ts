import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject
} from '@angular/core';
import { PropertyCardComponent } from '../propertyCard/propertyCard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, SharedModule, RouterModule],
  template: `
    <div class="flex justify-center items-center flex-col">
      <div class="flex flex-wrap justify-center gap-x-10 lg:gap-x-0 lg:justify-between px-4">
        <app-property-card
          *ngFor="
            let item of filterActiveProperties(properties).slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE
            )
          "
          (click)="onView(item)"
          [property]="item"
        />
      </div>
      <div class="flex justify-center lg:mx-10 w-full mb-10">
        <app-paginador
          [itemsPerPage]="ITEMS_PER_PAGE"
          [arrayLength]="properties.length"
          (onNext)="nextPage()"
          (onPrevius)="previousPage()"
          [currentPage]="currentPage"
          [totalPages]="totalPages"
          (onChange)="onPageChange($event)"
        ></app-paginador>
      </div>
    </div>
  `,
  styleUrls: ['./propertyList.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyListComponent {
  @Input() properties: any = [];
  cd = inject(ChangeDetectorRef);
  router = inject(Router);

  ITEMS_PER_PAGE: number = 9; // Cantidad de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: any;

  constructor() {}
  ngOnChanges() {
    this.totalPages = Math.ceil(this.properties.length / this.ITEMS_PER_PAGE);
  }

  filterActiveProperties(propiedades: []) {
    return propiedades.filter((propiedad: any) => propiedad.isActive);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.cd.markForCheck();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.cd.markForCheck();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.cd.markForCheck();
    }
  }

  onView(data: any) {
    // console.log(data);
    this.router.navigate([`propiedades/detalle/${data.id}`]);
  }
}
