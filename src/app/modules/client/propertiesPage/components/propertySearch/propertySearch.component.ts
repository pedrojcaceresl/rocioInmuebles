import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-property-search',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="w-full text-gray-600 border-none shadow-sm">
    <input
      (input)="filterProperties($event)"
      #txtInput
      class="w-full border-2 relative dark:text-slate-100 dark:placeholder:text-slate-100 dark:hover:bg-slate-700 dark:bg-slate-700 border-none border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none"
      type="search"
      name="search"
      placeholder="Buscar..."
    />
  </div>`,
  styleUrls: ['./propertySearch.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertySearchComponent {
  @Input() properties: any[] = [];
  @Output() filteredProperties = new EventEmitter<any[]>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['properties']) {
      this.properties = changes['properties'].currentValue;
      this.filteredProperties.emit(this.properties);  // Emit all properties initially
    }
  }

  filterProperties(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();
    const filtered = this.properties.filter(property => {
      return (
        property.title.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm) ||
        property.city.toLowerCase().includes(searchTerm) ||
        property.state.toLowerCase().includes(searchTerm) ||
        property.transactionType.toLowerCase().includes(searchTerm) ||
        property.type.toLowerCase().includes(searchTerm)
      );
    });
    this.filteredProperties.emit(filtered);
  }
}
