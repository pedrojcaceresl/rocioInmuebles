import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { PropertyCardComponent } from '../propertyCard/propertyCard.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, SharedModule],
  template: `
    <div class="max-w-6xl mx-auto flex flex-col justify-between">
      <div class="lg:grid grid-cols-3 gap-10 mx-10">
        <div
          *ngFor="
            let item of properties.slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE
            )
          "
        >
          <app-property-card [property]="item" />
        </div>
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

  ITEMS_PER_PAGE: number = 9; // Cantidad de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: any;

  ngOnChanges() {
    this.totalPages = Math.ceil(this.properties.length / this.ITEMS_PER_PAGE);
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
}
