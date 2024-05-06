import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-button-badge',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <button class="bg-green-600 uppercase text-white font-bold text-xs px-3 py-2 rounded-full">Alquiler</button>
  `,
  styleUrls: ['./buttonBadge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBadgeComponent { }
