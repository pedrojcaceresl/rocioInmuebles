import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <form [formGroup]="filterForm">
        <div class="my-4" formGroupName="priceRange">
          <h1 class="font-bold text-xl">Precio</h1>
          <div class="flex gap-4">
            <label>
              Min
              <input
                class="rounded-md border-gray-300 border-2 max-w-[128px]"
                type="text"
                name="min"
                id="min"
                placeholder="Min"
                formControlName="min"
              />
            </label>
            <label for="max"
              >Max
              <input
                class="rounded-md border-gray-300 border-2 max-w-[128px]"
                type="text"
                name="max"
                id="max"
                placeholder="Max"
                formControlName="max"
              />
            </label>
          </div>
        </div>

        <div class="my-4" formGroupName="categories">
          <h1 class="font-bold text-xl">Categoria</h1>
          <div *ngFor="let category of categories">
            <div class="gap-x-2 flex items-center">
              <input
                class="rounded-sm border-2 border-gray-300 bg-gray-100 focus:outline-none"
                type="checkbox"
                [formControlName]="category"
              />
              <label class="capitalize">{{ category }}</label>
            </div>
          </div>
        </div>
        <div class="my-4" formGroupName="locations">
          <h1 class="font-bold text-xl">Ubicación</h1>
          <div *ngFor="let location of locations">
            <div class="gap-x-2 flex items-center">
              <input
                class="rounded-sm border-2 border-gray-300 bg-gray-100 focus:outline-none"
                type="checkbox"
                [formControlName]="location"
              />
              <label class="capitalize">{{ location }}</label>
            </div>
          </div>
        </div>

        <div class="my-4" formGroupName="types">
          <h1 class="font-bold text-xl">Tipo</h1>
          <div *ngFor="let type of types">
            <div class="gap-x-2 flex items-center">
              <input
                class="rounded-sm border-2 border-gray-300 bg-gray-100 focus:outline-none"
                type="checkbox"
                [formControlName]="type"
              />
              <label class="capitalize">{{ type }}</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./propertyFilters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyFiltersComponent implements OnInit {
  filtersForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  cd = inject(ChangeDetectorRef);

  @Input() properties: any[] = [];
  @Output() onFiltered = new EventEmitter();

  categoriaForm!: FormGroup;
  ubicacionForm!: FormGroup;
  tipoForm!: FormGroup;
  mainForm!: FormGroup;
  filteredProperties: any = [];

  filterForm!: FormGroup;

  categories = ['Alquiler', 'Venta'];
  locations = ['Alto Paraná', 'Central', 'Itapúa'];
  types = [
    'casa quinta',
    'casa',
    'duplex',
    'granja',
    'terreno',
    'departamento en pozo',
    'lote en condominio',
  ];

  constructor() {
    this.onCreateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.properties = changes['properties'].currentValue;
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe((value) =>
      this.onFilterChange(value)
    );
  }

  onCreateForm() {
    this.filterForm = this.formBuilder.group({
      priceRange: this.formBuilder.group({
        min: [0],
        max: [100000000],
      }),
      categories: this.formBuilder.group(
        this.categories.reduce(
          (acc: any, curr) => ((acc[curr] = false), acc),
          {}
        )
      ),
      locations: this.formBuilder.group(
        this.locations.reduce(
          (acc: any, curr) => ((acc[curr] = false), acc),
          {}
        )
      ),
      types: this.formBuilder.group(
        this.types.reduce((acc: any, curr) => ((acc[curr] = false), acc), {})
      ),
    });
  }

  onFilterChange(value: any) {
    const filter = {
      priceRange: value.priceRange,
      categories: Object.keys(value.categories).filter(
        (key) => value.categories[key]
      ),
      locations: Object.keys(value.locations).filter(
        (key) => value.locations[key]
      ),
      types: Object.keys(value.types).filter((key) => value.types[key]),
    };
    this.onFiltered.emit(filter);
  }
}
