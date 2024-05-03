import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PropertyCardComponent } from '../propertyCard/propertyCard.component';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  template: `
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-3">
        <app-property-card *ngFor="let item of list" />
      </div>
    </div>
  `,
  styleUrls: ['./propertyList.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyListComponent {
  list = [1, 2, 3, 4, 5, 6];
}
