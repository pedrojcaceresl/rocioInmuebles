import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss'],
})
export class PaginadorComponent {
  @Input() arrayLength!: number;
  @Input() itemsPerPage: number = 4; // Cantidad de elementos por página
  @Input() currentPage: number = 1;
  @Input() totalPages!: number;

  @Output() onNext = new EventEmitter<any>();
  @Output() onPrevius = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();

  filteredCards: any[] = []; // Aquí deberías cargar los datos filtrados

  constructor() {}

  // Función para cambiar de página
  onPageChange(newPage: number): void {
    this.onChange.emit(newPage)
  }

  // Función para generar un arreglo de números para la paginación
  getPaginationArray(): number[] {
    this.totalPages = Math.ceil(this.arrayLength / this.itemsPerPage);
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  previusPage() {
    this.onPrevius.emit();
  }

  nextPage() {
    this.onNext.emit();
  }

  obtenerClases(page: number): { [key: string]: boolean } {
    return {
      [this.currentPage == page
        ? 'flex items-center justify-center cursor-pointer px-4 h-10 leading-tight text-white bg-blue-500 border border-gray-300  hover:text-gray-700 dark:bg-blue-500 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
        : 'flex items-center justify-center cursor-pointer px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']:
        true,
    };
  }
}
