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
      <form [formGroup]="filtersForm">
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
        <div *ngFor="let filter of filters" class="my-4">
          <h1 class="font-bold text-xl">{{ filter.title }}</h1>
          <div>
            <div
              [formGroupName]="filter.title.toLowerCase()"
              class="gap-x-2 flex items-center"
              *ngFor="let filterOption of filter.options"
            >
              <input
                class="rounded-sm border-2 border-gray-300 bg-gray-100 focus:outline-none"
                type="checkbox"
                [formControlName]="filterOption"
                [value]="filterOption"
                [name]="filterOption"
                [id]="filterOption"
              />
              <label class="capitalize" [for]="filterOption">{{
                filterOption
              }}</label>
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

  filters = [
    {
      title: 'Categoria',
      options: ['Alquiler', 'Venta'],
    },
    {
      title: 'UbicaciÓn',
      options: ['alto paraná', 'central'],
    },
    {
      title: 'Tipo',
      options: [
        'casa quinta',
        'casa',
        'duplex',
        'granja',
        'terreno',
        'departamento en pozo',
        'lote en condominio',
      ],
    },
  ];

  // Your list of items to be filtered
  // items = [
  //   {
  //     name: 'Item 1',
  //     categoria: 'alquiler',
  //     ubicacion: 'alto paraná',
  //     tipo: 'casa',
  //   },
  //   {
  //     name: 'Item 1',
  //     categoria: 'alquiler',
  //     ubicacion: 'central',
  //     tipo: 'casa',
  //   },
  //   {
  //     name: 'Item 2',
  //     categoria: 'venta',
  //     ubicacion: 'central',
  //     tipo: 'terreno',
  //   },
  //   {
  //     name: 'Item 3',
  //     categoria: 'alquiler',
  //     ubicacion: 'alto paraná',
  //     tipo: 'quinta',
  //   },
  //   // Add more items as needed
  // ];

  filteredItems: any = [];
  ngOnInit() {
    this.createForm();
    this.setupFormChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.properties = changes['properties'].currentValue;
    // console.log('LAS PROPERTIES RECIBIDAS', this.properties);
  }

  createForm() {
    const formGroup: any = {};
    let optionsGroup: any = {};

    // se crea el fromGroup y formControl de cada cosa
    for (let i = 0; i < this.filters.length; i++) {
      const filterName = this.filters[i];
      filterName.options.forEach((option: any) => {
        optionsGroup[option] = this.formBuilder.control(false);
      });
      formGroup[filterName.title.toLowerCase()] =
        this.formBuilder.group(optionsGroup);
      optionsGroup = {}; // se reinicia el grupo para crear otro
    }

    this.filtersForm = this.formBuilder.group(formGroup);
  }

  setupFormChanges() {
    this.filtersForm.valueChanges.subscribe((res) => {
      // this.filterByTransactionType();
      this.filterByTypes();
    });
  }

  // filterByTransactionType() {
  //   const selectedValues: string[] = [];
  //   const formValue = this.filtersForm.value;
  //   Object.keys(formValue).forEach((key) => {
  //     // console.log('LA LLAVE',key);
  //     // Trae el array de los filtros 3 veces
  //     // console.log('el formValue',formValue);
  //     Object.keys(formValue[key]).forEach((name) => {
  //       if (formValue[key][name]) {
  //         // ACA DEVUELVE TRUE??
  //         selectedValues.push(name);
  //       }
  //     });
  //   });

  //   console.log("TRANSACTION Los selectedValues", selectedValues);

  //   console.log('DATA A SER FILTRADA',this.properties)

  //   // Filter items based on selected values
  //   this.filteredItems = this.properties.filter((item: any) =>

  //     Object.keys(formValue).some((key) => {
  //       // console.log('QUE ES ESTO',item.transactionType);
  //       return item[key] === 'todos'
  //       ? true
  //       : selectedValues.includes(item.transactionType);
  //     })

  //   );

  //   // console.log('EL FORM',formValue);
  //   this.onFiltered.emit(this.filteredItems);
  //   this.cd.markForCheck();
  //   return;
  // }

  filterByTypes() {
    const selectedValues: string[] = [];
    const formValue = this.filtersForm.value;
    Object.keys(formValue).forEach((key) => {
      // console.log('LA LLAVE',key);
      // Trae el array de los filtros 3 veces
      // console.log('el formValue',formValue);
      Object.keys(formValue[key]).forEach((name) => {
        if (formValue[key][name]) {
          // ACA DEVUELVE TRUE??
          selectedValues.push(name);
        }
      });
    });

    // console.log("TYPES Los selectedValues", selectedValues);

    this.filteredItems = this.properties.filter((item: any) =>
      Object.keys(formValue).some((key) => {
        // console.log('QUE ES ESTO',item.type);
        return item[key] === 'todos'
          ? true
          : selectedValues.includes(item.type);
      })
    );

    this.onFiltered.emit(this.filteredItems);
    this.cd.markForCheck();
    return;
  }


  // filterProducts( products: any){
  //   return products.filter(products=>{
  //     return (
  //       products.priceSale >= filters.minPrice &&
  //       (
  //         filters.category == 'all' ||
  //         products.category == this.filters.category
  //       )
  //     )
  //   })
  // }
}
