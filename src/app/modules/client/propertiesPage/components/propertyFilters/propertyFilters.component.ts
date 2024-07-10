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
import Propiedad from 'src/app/modules/propiedades/interfaces/propiedades.interface';

@Component({
  selector: 'app-property-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <form [formGroup]="mainForm">
        <div class="my-4">
          <h1 class="font-bold text-xl">Precio</h1>
          <div class="flex gap-4">
            <input
              class="rounded-md border-gray-300 border-2 max-w-[128px]"
              type="text"
              name="min"
              id="min"
              placeholder="Min"
            />
            <input
              class="rounded-md border-gray-300 border-2 max-w-[128px]"
              type="text"
              name="max"
              id="max"
              placeholder="Max"
            />
          </div>
        </div>

        <div class="my-4">
          <h1 class="font-bold text-xl">Categoria</h1>
          <div formGroupName="categoria">
            <div class="gap-x-2 flex items-center">
              <input
                class="rounded-sm border-2 border-gray-300 bg-gray-100 focus:outline-none"
                type="checkbox"
                formControlName="alquiler"
                value="alquiler"
                name="alquiler"
                id="alquiler"
              />
              <label class="capitalize">Alquiler</label>
            </div>
          </div>
          <div formGroupName="categoria">
            <div class="gap-x-2 flex items-center">
              <input
                class="rounded-sm border-2 border-gray-300 bg-gray-100 focus:outline-none"
                type="checkbox"
                formControlName="venta"
                value="venta"
                name="venta"
                id="venta"
              />
              <label class="capitalize">Venta</label>
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

  categoriaFilters = ['Alquiler', 'Venta'];
  ubicacion = ['alto paraná', 'central'];
  tipo = [
    'casa quinta',
    'casa',
    'duplex',
    'granja',
    'terreno',
    'departamento en pozo',
    'lote en condominio',
  ];

  filteredProperties: any = [];
  ngOnInit() {
    this.createForm();
    this.setupFormChanges();

    this.mainForm = this.formBuilder.group({});

    this.categoriaForm = this.formBuilder.group({
      alquiler: [false],
      venta: [false],
    });

    this.mainForm.addControl('categoria', this.categoriaForm);

    // Subscríbete a los cambios en el formulario una vez
    this.mainForm.valueChanges.subscribe((values) => {
      this.filterByCategoria(values);
    });

    this.filterByCategoria(this.mainForm.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.properties = changes['properties'].currentValue;
  }

  filterByCategoria(values: any): void {
    const categoriaValues = values.categoria;

    const activeFilters = Object.keys(categoriaValues)
      .filter((key) => categoriaValues[key])
      .map((key) => key.toLowerCase());

    console.log('activeFilters ', activeFilters);

    if (activeFilters.length === 0) {
      this.filteredProperties = this.properties;
    } else {
      this.filteredProperties = this.properties.filter((property) => {
        const transactioType = property.transactionType.toLowerCase();
        return activeFilters.includes(transactioType);
      });
    }
    console.log(this.filteredProperties);
    this.onFiltered.emit(this.filteredProperties);
  }


  createForm() {
    const formGroup: any = {};

    this.filtersForm = this.formBuilder.group(formGroup);
  }

  setupFormChanges() {
    this.filtersForm.valueChanges.subscribe((res) => {});
  }
}
