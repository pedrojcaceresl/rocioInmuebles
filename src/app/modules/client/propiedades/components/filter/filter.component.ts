import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  // Properties to store filter selections
  selectedLocation!: string;
  selectedSaleOrRent!: string;
  selectedPropertyType!: string;
  selectedBedrooms!: string;
  maxPrice!: number;

  // Function to apply filters and update property listing
  applyFilters() {
    // Implement logic to filter properties based on selected criteria
    // You'll need to fetch property data and filter it here
  }
}
