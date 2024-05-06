import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { PropertyCardComponent } from '../propertyCard/propertyCard.component';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  template: `
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-3">
        <div *ngFor="let item of properties">
          <app-property-card [property]="item" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./propertyList.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyListComponent {
  cd = inject(ChangeDetectorRef);

  @Input() properties: any = [];

}
