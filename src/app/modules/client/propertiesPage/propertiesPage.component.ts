import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { PropertiesRoutingModule } from './propertiesPage-routing.module';
import { PropertyCardComponent } from './components/propertyCard/propertyCard.component';
import { PropertyListComponent } from './components/propertyList/propertyList.component';
@Component({
  selector: 'app-properties-page',
  standalone: true,
  imports: [CommonModule, PropertyListComponent ],
  template: `
  
    <app-property-list />

  `,
  styleUrls: ['./propertiesPage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesPageComponent {
  ngOnInit() {
    console.log('init');
  }
}
